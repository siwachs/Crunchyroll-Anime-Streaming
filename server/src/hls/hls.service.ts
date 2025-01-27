import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { basename, extname, join } from 'path';
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
      audioBitrate: '96k',
    },
    {
      width: 854,
      height: 480,
      label: '480p',
      videoBitrate: '1400k',
      audioBitrate: '128k',
    },
    {
      width: 1280,
      height: 720,
      label: '720p',
      videoBitrate: '2800k',
      audioBitrate: '192k',
    },
    {
      width: 1920,
      height: 1080,
      label: '1080p',
      videoBitrate: '5000k',
      audioBitrate: '256k',
    },
  ];

  constructor(
    private readonly episodeProducerService: EpisodeProducerService,
  ) {}

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

    const variantPlaylists = [];

    const transcodeStartsOn = Date.now();
    await Promise.all(
      targetResolutions.map(async ({ width, height, label, audioBitrate }) => {
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
              audioBitrate,
              '-hls_time',
              '10',
              '-hls_playlist_type',
              'vod',
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
            .on('error', (err) => {
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

    await this.createMasterPlaylist(fileOutputDir, variantPlaylists);

    const transcodeEndOn = Date.now();
    console.log(
      `Master Playlist created for ${fileNameWithExt} in ${((transcodeEndOn - transcodeStartsOn) / 60000).toFixed(2)}Minutes.`,
    );

    console.log('Deleting Input File...');
    unlinkSync(inputFilePath);

    console.log(`Uploading ${fileNameWithExt} transcoded media to firebase...`);
    this.episodeProducerService.sendTranscodedMediaUploadsMessage(
      fileOutputDir,
      fileNameWithExt,
      seriesId,
      seasonId,
      episodeId,
      fileOutputDir,
    );
  }

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

  private async createMasterPlaylist(
    outputDir: string,
    variants: { label: string; fileName: string }[],
  ): Promise<void> {
    const masterPlaylistPath = join(outputDir, 'master.m3u8');
    const masterPlaylistContent = ['#EXTM3U'];

    for (const { label, fileName } of variants) {
      const resolution = this.resolutions.find((res) => res.label === label);
      if (resolution) {
        const bandwidth = this.estimateBandwidth(
          resolution.width,
          resolution.height,
        );
        masterPlaylistContent.push(
          `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution.width}x${resolution.height}`,
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
