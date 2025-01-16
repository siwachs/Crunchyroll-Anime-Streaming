import { Injectable } from '@nestjs/common';

import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { KafkaService } from 'src/kafka/kafka.service';

import { SERIES_POSTER_UPLOADS } from 'src/common/constants/kafkaTopics';

@Injectable()
export class SeriesProducerService {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private readonly kafkaService: KafkaService,
  ) {}

  async sendSeriesPosterUploadsMessage(
    docId: string,
    files: Express.Multer.File[],
  ) {
    const message = {
      docId,
      files: files.map(this.dataProcessingService.fileBufferToBase64String),
    };

    await this.kafkaService.sendMessage(SERIES_POSTER_UPLOADS, docId, message);
  }
}
