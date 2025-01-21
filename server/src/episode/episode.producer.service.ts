import { Injectable } from '@nestjs/common';

import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { KafkaService } from 'src/kafka/kafka.service';

import {
  SEASON_EPISODE_THUMBNAIL_UPLOADS,
  MEDIA_UPLOADS_TRANSCODE_TO_HLS,
} from 'src/common/constants/kafkaTopics';

@Injectable()
export class EpisodeProducerService {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private readonly kafkaService: KafkaService,
  ) {}

  async sendEpisodeThumbnailUploadsMessage(
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

  async sendEpisodeMediaUploadsMessage(
    seriesId: string,
    seasonId: string,
    episodeId: string,
    media: Express.Multer.File,
  ) {
    const message = { seriesId, seasonId, episodeId, mediaPath: media.path };

    await this.kafkaService.sendMessage(
      MEDIA_UPLOADS_TRANSCODE_TO_HLS,
      media.originalname,
      message,
    );
  }
}
