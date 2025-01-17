import { Injectable } from '@nestjs/common';

import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { KafkaService } from 'src/kafka/kafka.service';

import { SEASON_EPISODE_UPLOADS } from 'src/common/constants/kafkaTopics';

@Injectable()
export class EpisodeProducerService {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private readonly kafkaService: KafkaService,
  ) {}

  async sendEpisodeUploadsMessage(
    seriesId: string,
    seasonId: string,
    episodeId: string,
    file: Express.Multer.File,
  ) {
    const message = {
      seriesId,
      seasonId,
      episodeId,
      file: this.dataProcessingService.fileBufferToBase64String(file),
    };

    const key = `${seasonId}_${seasonId}_${episodeId}`;

    await this.kafkaService.sendMessage(SEASON_EPISODE_UPLOADS, key, message);
  }
}
