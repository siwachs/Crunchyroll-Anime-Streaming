import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { readdir, unlink } from 'fs/promises';
import { basename, extname, join } from 'path';
import { PassThrough } from 'stream';
import { Injectable } from '@nestjs/common';

import { EpisodeProducerService } from 'src/episode/episode.producer.service';

import * as ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic || '/usr/bin/ffmpeg');

@Injectable()
export class HlsService {
  private readonly resolutions = [
    {
      width: 640,
      height: 360,
      label: '360p',
      videoBitrate: '800k',
    },
    // {
    //   width: 854,
    //   height: 480,
    //   label: '480p',
    //   videoBitrate: '1400k',
    // },
    // {
    //   width: 1280,
    //   height: 720,
    //   label: '720p',
    //   videoBitrate: '2800k',
    // },
    // {
    //   width: 1920,
    //   height: 1080,
    //   label: '1080p',
    //   videoBitrate: '5000k',
    // },
  ];

  constructor(
    private readonly episodeProducerService: EpisodeProducerService,
  ) {}

  private async getInputVideoResolution(
    inputFilePath: string,
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
        if (err) {
          console.error(`Error retrieving video metadata: ${err.message}`);
          return reject(err as Error);
        }

        const { width, height } = metadata.streams[0];
        resolve({ width, height });
      });
    });
  }

  private async getDuration(inputFilePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputFilePath, (err: Error, metadata) => {
        if (err) return reject(err);
        resolve(metadata.format.duration || 0);
      });
    });
  }

  private async getThumbnail(
    inputFilePath: string,
    duration: number,
  ): Promise<{
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }> {
    return new Promise((resolve, reject) => {
      if (duration <= 0) return reject(new Error('Invalid video duration.'));

      const randomTimestamp = (Math.random() * duration).toFixed(2);
      const passthroughStream = new PassThrough(); // Stream for memory storage
      const chunks: Buffer[] = [];

      ffmpeg(inputFilePath)
        .seekInput(randomTimestamp)
        .frames(1)
        .format('image2')
        .outputOptions([
          '-vf',
          'scale=1280:720', // Optimize resolution
          '-q:v',
          '2', // (lower = better, range 2-5)
        ])
        .pipe(passthroughStream, { end: true }) // Stream directly to memory
        .on('data', (chunk) => chunks.push(chunk)) // Collect data in buffer
        .on('end', () =>
          resolve({
            buffer: Buffer.concat(chunks),
            originalname: 'thumbnail',
            mimetype: 'image/jpeg',
          }),
        )
        .on('error', (err: Error) => reject(err));
    });
  }

  private async getSubtitles(inputFilePath: string, fileOutputDir: string) {
    return new Promise<{ fileName: string; title: string; language: string }[]>(
      (resolve, reject) => {
        ffmpeg.ffprobe(inputFilePath, async (err: Error, metadata) => {
          if (err) return reject(err);

          const subtitleStreams = metadata.streams.filter(
            (stream) => stream.codec_type === 'subtitle',
          );
          if (subtitleStreams.length === 0) return resolve([]);

          const gettingSubttileStartOn = Date.now();
          const subtitleFiles: {
            fileName: string;
            title: string;
            language: string;
          }[] = [];
          const batchSize = 3;

          for (let i = 0; i < subtitleStreams.length; i += batchSize) {
            const batch = subtitleStreams.slice(i, i + batchSize);

            await Promise.all(
              batch.map((stream, index) => {
                const subtitleIndex = stream.index;

                const subtitleTitle =
                  stream.tags?.title ||
                  stream.tags?.language ||
                  `Track_${index + 1}`;
                const subtitleLang = stream.tags?.language || subtitleTitle;
                const subtitleFileName = subtitleTitle
                  .toLowerCase()
                  .replaceAll(' ', '_');

                const outputSegmentPath = join(
                  fileOutputDir,
                  `sub_${subtitleFileName}_%03d.ts`,
                );
                const outputPlaylistPath = join(
                  fileOutputDir,
                  `sub_${subtitleFileName}.m3u8`,
                );

                console.log(`Getting Subtitle ${subtitleTitle}`);
                return new Promise<void>(
                  (transcodeResolve, transcodeReject) => {
                    ffmpeg(inputFilePath)
                      .outputOptions([
                        `-map 0:v:0`, // Select video stream
                        `-map 0:${subtitleIndex}`, // Select subtitle track
                        '-c:v libx264',
                        '-preset ultrafast', // Fastest preset
                        '-s 176x144', // Lowest resolution
                        '-b:v 50k', // Minimal bitrate
                        '-r 10', // Reduce frame rate (faster processing)
                        '-g 10', // Reduce GOP size (faster encoding)
                        '-an', // No audio
                        '-c:s webvtt',
                        '-hls_time 10',
                        '-hls_playlist_type vod',
                        '-hls_segment_filename',
                        outputSegmentPath,
                        '-force_key_frames expr:gte(t,n_forced*10)',
                      ])
                      .output(outputPlaylistPath)
                      .on('end', async () => {
                        subtitleFiles.push({
                          fileName: `sub_${subtitleFileName}.m3u8`,
                          title: subtitleTitle,
                          language: subtitleLang,
                        });

                        console.log(`Subtitle ${subtitleTitle} is processed.`);

                        try {
                          const files = await readdir(fileOutputDir);
                          const tsFiles = files.filter(
                            (file) =>
                              file.startsWith(`sub_${subtitleFileName}_`) &&
                              file.endsWith('.ts'),
                          );

                          await Promise.all(
                            tsFiles.map((file) =>
                              unlink(join(fileOutputDir, file)),
                            ),
                          );
                          console.log(
                            `Removed ${tsFiles.length} .ts segment files for ${subtitleTitle}`,
                          );
                        } catch (error) {
                          console.warn(
                            `Failed to delete .ts segments for ${subtitleTitle}:`,
                            error.message,
                          );
                        }

                        transcodeResolve();
                      })
                      .on('error', (err: Error) => transcodeReject(err))
                      .run();
                  },
                );
              }),
            );
          }

          const gettingSubttileEndOn = Date.now();
          console.log(
            `Subtitle processing completed in ${((gettingSubttileEndOn - gettingSubttileStartOn) / 60000).toFixed(2)} minutes.`,
          );
          resolve(subtitleFiles);
        });
      },
    );
  }

  async transcodeToHLS(
    seriesId: string,
    seasonId: string,
    episodeId: string,
    inputFilePath: string,
    outputDir = './transcodes',
  ): Promise<void> {
    const fileName = basename(inputFilePath, extname(inputFilePath));
    const fileNameWithExt = basename(inputFilePath);
    const fileOutputDir = join(outputDir, fileName);

    if (!existsSync(fileOutputDir))
      mkdirSync(fileOutputDir, { recursive: true });

    const inputFileResolution =
      await this.getInputVideoResolution(inputFilePath);
    const targetResolutions = this.resolutions.filter(
      (res) =>
        res.width <= inputFileResolution.width &&
        res.height <= inputFileResolution.height,
    );

    if (targetResolutions.length === 0) {
      return console.warn(
        `${fileNameWithExt}'s resolution is lower than the defined resolutions. Skipping transcoding.`,
      );
    }

    const duration = await this.getDuration(inputFilePath);
    const thumbnail = await this.getThumbnail(inputFilePath, duration);
    const subtitles = await this.getSubtitles(inputFilePath, fileOutputDir);

    const variantPlaylists = [];

    const transcodeStartsOn = Date.now();
    await Promise.all(
      targetResolutions.map(async ({ width, height, label }) => {
        const outputFileName = `${label}.m3u8`;
        const segmentFileName = `${label}_%03d.ts`;

        const outputFilePath = join(fileOutputDir, outputFileName);
        const outputSegmentPath = join(fileOutputDir, segmentFileName);

        console.log(
          `Starting HLS conversion for : ${fileNameWithExt}, with format: ${label}.`,
        );

        await new Promise<void>((resolve, reject) => {
          ffmpeg(inputFilePath)
            .outputOptions([
              '-sn', // Disable subtitle processing
              '-c:v',
              'libx264', // libx264, libx256 (Slow)
              '-crf',
              '23', // Adjust this value between 18 and 22 for desired quality (Best 20) Current: 23
              '-preset',
              'slow', // Use 'veryslow' for better compression at the cost of encoding time or slow
              '-vf',
              `scale=${width}:${height}`,
              '-c:a',
              'aac',
              '-b:a',
              '128k', // Audio bitrate (192K) is Higher
              '-ar',
              '48000', // Standard sample rate
              '-ac',
              '2', // Stereo audio ie surround feel of (LR)
              '-af',
              'loudnorm=I=-16:LRA=11:TP=-1.5',
              '-hls_time',
              '10',
              '-hls_playlist_type',
              'vod',
              `-force_key_frames expr:gte(t,n_forced*10)`,
              '-hls_segment_filename',
              outputSegmentPath,
            ])
            .output(outputFilePath)
            .on('end', () => {
              console.log(
                `Completed HLS conversion for : ${fileNameWithExt}, with format: ${label}.`,
              );
              resolve();
            })
            .on('error', (err: Error) => {
              console.error(
                `Error during HLS conversion for : ${fileNameWithExt}, with format: ${label}. ${err.message}.`,
              );
              reject(err);
            })
            .run();
        });

        variantPlaylists.push({ label, fileName: outputFileName });
      }),
    );

    await this.createMasterPlaylist(fileOutputDir, variantPlaylists, subtitles);

    const transcodeEndOn = Date.now();
    console.log(
      `Master Playlist created for ${fileNameWithExt} in ${((transcodeEndOn - transcodeStartsOn) / 60000).toFixed(2)}Minutes.`,
    );

    console.log('Deleting Input File...');
    // unlinkSync(inputFilePath);

    console.log(`Uploading ${fileNameWithExt} transcoded media to supabase...`);

    // this.episodeProducerService.sendThumbnailUploadsMessage(
    //   seriesId,
    //   seasonId,
    //   episodeId,
    //   thumbnail as Express.Multer.File,
    // );
    // this.episodeProducerService.sendTranscodedMediaUploadsMessage(
    //   fileOutputDir,
    //   fileNameWithExt,
    //   seriesId,
    //   seasonId,
    //   episodeId,
    //   duration,
    // );
  }

  private async createMasterPlaylist(
    outputDir: string,
    variants: { label: string; fileName: string }[],
    subtitles: { fileName: string; title: string; language: string }[],
  ) {
    const masterPlaylistPath = join(outputDir, 'master.m3u8');
    const masterPlaylistContent = ['#EXTM3U', '\n'];

    // Add VTT subtitle files
    subtitles.forEach((subtitle, index) => {
      const defaultAttr = index === 0 ? ',DEFAULT=YES' : '';
      masterPlaylistContent.push(
        `#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="${subtitle.title}",LANGUAGE="${subtitle.language}",AUTOSELECT=YES${defaultAttr},FORCED=NO,URI="${subtitle.fileName}"`,
      );
    });

    masterPlaylistContent.push('\n');

    // Add video streams
    for (const { label, fileName } of variants) {
      const resolution = this.resolutions.find((res) => res.label === label);
      if (resolution) {
        const bandwidth = this.estimateBandwidth(
          resolution.width,
          resolution.height,
        );
        masterPlaylistContent.push(
          `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution.width}x${resolution.height},SUBTITLES="subs"`,
          fileName,
        );
      }
    }

    writeFileSync(masterPlaylistPath, masterPlaylistContent.join('\n'));
  }

  private estimateBandwidth(width: number, height: number): number {
    if (width === 1920 && height === 1080) return 5000000;
    if (width === 1280 && height === 720) return 2800000;
    if (width === 854 && height === 480) return 1400000;
    if (width === 640 && height === 360) return 800000;
    return 1000000; // Default bandwidth
  }
}
