import { Injectable } from '@nestjs/common';

import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { KafkaService } from 'src/kafka/kafka.service';

import {
  SEASON_EPISODE_THUMBNAIL_UPLOADS,
  MEDIA_UPLOADS_TRANSCODE_TO_HLS,
  TRANSCODED_MEDIA_UPLOADS,
} from 'src/common/constants/kafkaTopics';

@Injectable()
export class EpisodeProducerService {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private readonly kafkaService: KafkaService,
  ) {}

  async sendThumbnailUploadsMessage(
    seriesId: string,
    seasonId: string,
    episodeId: string,
    thumbnail: Express.Multer.File,
  ) {
    const message = {
      seriesId,
      seasonId,
      episodeId,
      file: this.dataProcessingService.fileBufferToBase64String(thumbnail),
    };

    const key = `${seriesId}_${seasonId}_${episodeId}`;

    await this.kafkaService.sendMessage(
      SEASON_EPISODE_THUMBNAIL_UPLOADS,
      key,
      message,
    );
  }

  sendMediaUploadsTranscodeMessage(
    seriesId: string,
    seasonId: string,
    episodeId: string,
    mediaPath: string,
  ) {
    const message = { seriesId, seasonId, episodeId, mediaPath };

    this.kafkaService.sendMessage(
      MEDIA_UPLOADS_TRANSCODE_TO_HLS,
      mediaPath,
      message,
    );
  }

  sendTranscodedMediaUploadsMessage(
    masterFileDir: string,
    masterFileName: string,
    seriesId: string,
    seasonId: string,
    episodeId: string,
    transcodedMediaDir: string,
  ) {
    const message = {
      masterFileDir,
      masterFileName,
      seriesId,
      seasonId,
      episodeId,
      transcodedMediaDir,
    };

    this.kafkaService.sendMessage(
      TRANSCODED_MEDIA_UPLOADS,
      transcodedMediaDir,
      message,
    );
  }
}
