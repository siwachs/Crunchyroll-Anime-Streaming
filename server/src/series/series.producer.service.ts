import { Injectable } from '@nestjs/common';

import { ValidatorAndDataProcessingService } from 'src/validator-and-data-processing/validator-and-data-processing.service';
import { KafkaService } from 'src/kafka/kafka.service';

import { SERIES_IMAGES_UPLOADS } from 'src/common/constants/kafkaTopics';

@Injectable()
export class SeriesProducerService {
  constructor(
    private readonly validatorAndDataProcessingService: ValidatorAndDataProcessingService,
    private readonly kafkaService: KafkaService,
  ) {}

  sendImagesUploadsMessage(
    docId: string,
    files: Record<string, Express.Multer.File | null>,
  ) {
    const message = {
      docId,
      files: Object.keys(files).reduce((acc, key) => {
        acc[key] =
          files[key] === null
            ? files[key]
            : this.validatorAndDataProcessingService.fileBufferToBase64String(
                files[key],
              );

        return acc;
      }, {}),
    };

    this.kafkaService.sendMessage(SERIES_IMAGES_UPLOADS, docId, message);
  }
}
