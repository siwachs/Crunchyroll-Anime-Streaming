import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { basename, extname, join } from 'path';

import { Injectable } from '@nestjs/common';

import * as ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic || '/usr/bin/ffmpeg');

@Injectable()
export class HlsService {
  private readonly resolutions = [
    { width: 640, height: 360, bitrate: '1000k', label: '360p' },
    { width: 854, height: 480, bitrate: '2500k', label: '480p' },
    { width: 1280, height: 720, bitrate: '5000k', label: '720p' },
    { width: 1920, height: 1080, bitrate: '8000k', label: '1080p' },
  ];

  async transcodeToHLS(
    inputFilePath: string,
    outputDir = './transcodes',
  ): Promise<void> {
    const fileName = basename(inputFilePath, extname(inputFilePath));
    const fileOutputDir = join(outputDir, fileName);

    if (!existsSync(fileOutputDir))
      mkdirSync(fileOutputDir, { recursive: true });

    const variantPlaylists = [];

    for (const { width, height, bitrate, label } of this.resolutions) {
      const outputFileName = `${label}.m3u8`;
      const segmentFileName = `${label}_%03d.ts`;

      const outputFilePath = join(fileOutputDir, outputFileName);
      const outputSegmentPath = join(fileOutputDir, segmentFileName);

      console.log(`Start HLS conversion for ${label}`);

      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputFilePath)
          .outputOptions([
            '-c:v',
            'libx264',
            '-b:v',
            bitrate,
            '-vf',
            `scale=${width}:${height}`,
            '-c:a',
            'aac',
            '-b:a',
            '128k',
            '-hls_time',
            '10',
            '-hls_playlist_type',
            'vod',
            '-hls_segment_filename',
            outputSegmentPath,
          ])
          .output(outputFilePath)
          .on('end', () => {
            console.log(`Completed HLS conversion for ${label}`);
            resolve();
          })
          .on('error', (err: Error) => {
            console.error(
              `Error during HLS conversion for ${label}: ${err.message}`,
            );
            reject(err);
          })
          .run();
      });

      variantPlaylists.push({ label, fileName: outputFileName });
    }

    await this.createMasterPlaylist(
      inputFilePath,
      fileName,
      fileOutputDir,
      variantPlaylists,
    );
  }

  private async createMasterPlaylist(
    inputFilePath: string,
    basename: string,
    outputDir: string,
    variants: { label: string; fileName: string }[],
  ): Promise<void> {
    const masterPlaylistPath = join(outputDir, `${basename}_master.m3u8`);
    const masterPlaylistContent = ['#EXTM3U'];

    for (const { label, fileName } of variants) {
      const resolution = this.resolutions.find((res) => res.label === label);
      if (resolution) {
        const bandwidth = parseInt(resolution.bitrate) * 1000;
        masterPlaylistContent.push(
          `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution.width}x${resolution.height}`,
          fileName,
        );
      }
    }

    writeFileSync(masterPlaylistPath, masterPlaylistContent.join('\n'));
    console.log('Master playlist created successfully');

    unlinkSync(inputFilePath);
  }
}
