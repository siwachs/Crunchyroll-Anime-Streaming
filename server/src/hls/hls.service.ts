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
    { width: 640, height: 360, bitrate: '1000k', label: '360p' },
    { width: 854, height: 480, bitrate: '2500k', label: '480p' },
    { width: 1280, height: 720, bitrate: '5000k', label: '720p' },
    { width: 1920, height: 1080, bitrate: '8000k', label: '1080p' },
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

    for (const { width, height, bitrate, label } of this.resolutions) {
      const outputFileName = `${label}.m3u8`;
      const segmentFileName = `${label}_%03d.ts`;

      const outputFilePath = join(fileOutputDir, outputFileName);
      const outputSegmentPath = join(fileOutputDir, segmentFileName);

      console.log(
        `Starting HLS conversion for : ${fileNameWithExt}, and format: ${label}.`,
      );

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
            console.log(
              `Completed HLS conversion for : ${fileNameWithExt}, and format: ${label}.`,
            );
            resolve();
          })
          .on('error', (err) => {
            console.error(
              `Error during HLS conversion for : ${fileNameWithExt}, and format: ${label}. ${err.message}.`,
            );
            reject(err);
          })
          .run();
      });

      variantPlaylists.push({ label, fileName: outputFileName });
    }

    await this.createMasterPlaylist(fileOutputDir, variantPlaylists);
    console.log(`Master Playlist created for ${fileNameWithExt}.`);

    console.log('Deleting Input File...');
    unlinkSync(inputFilePath);

    console.log(`Uploading ${fileNameWithExt} transcoded media to firebase...`);
    await this.episodeProducerService.sendTranscodedMediaUploadsMessage(
      fileOutputDir,
      fileNameWithExt,
      seriesId,
      seasonId,
      episodeId,
      fileOutputDir,
    );
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
        const bandwidth = parseInt(resolution.bitrate) * 1000;
        masterPlaylistContent.push(
          `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution.width}x${resolution.height}`,
          fileName,
        );
      }
    }

    writeFileSync(masterPlaylistPath, masterPlaylistContent.join('\n'));
    console.log('Master playlist created successfully');
  }
}
