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
    { width: 640, height: 360, label: '360p', audioBitrate: '96k' },
    { width: 854, height: 480, label: '480p', audioBitrate: '128k' },
    { width: 1280, height: 720, label: '720p', audioBitrate: '192k' },
    { width: 1920, height: 1080, label: '1080p', audioBitrate: '256k' },
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

    const variantPlaylists = [];

    const transcodeStartsOn = Date.now();
    await Promise.all(
      this.resolutions.map(async ({ width, height, label, audioBitrate }) => {
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
              'libx264',
              '-crf',
              '23', // Adjust this value between 18 and 22 for desired quality (Best 20)
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

    // console.log(`Uploading ${fileNameWithExt} transcoded media to firebase...`);
    // this.episodeProducerService.sendTranscodedMediaUploadsMessage(
    //   fileOutputDir,
    //   fileNameWithExt,
    //   seriesId,
    //   seasonId,
    //   episodeId,
    //   fileOutputDir,
    // );
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
    if (width === 1920 && height === 1080) return 5000000; // 5 Mbps
    if (width === 1280 && height === 720) return 2800000; // 2.8 Mbps
    if (width === 854 && height === 480) return 1400000; // 1.4 Mbps
    if (width === 640 && height === 360) return 800000;
    return 1000000; // Default to 1 Mbps
  }
}
