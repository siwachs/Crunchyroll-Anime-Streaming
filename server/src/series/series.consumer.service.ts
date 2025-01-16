import { Injectable } from '@nestjs/common';

import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { FirebaseService } from '../firebase/firebase.service';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Series } from './schemas/series.schema';

import { File } from 'src/common/types';
import { SERIES_BASE_STORAGE_REF } from 'src/common/constants/firebase';

@Injectable()
export class SeriesConsumerService {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    @InjectModel(Series.name) private readonly seriesModel: Model<Series>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async uploadSeriesPoster(message: { docId: string; files: File[] }) {
    const { docId, files } = message;

    const bufferFiles = files.map(
      this.dataProcessingService.base64StringToFileBuffer,
    );

    const uploadedFilesURLs = await this.firebaseService.uploadFiles(
      bufferFiles,
      `${SERIES_BASE_STORAGE_REF}/${docId}`,
    );

    const { tall, wide } = uploadedFilesURLs;

    await this.seriesModel.findByIdAndUpdate(docId, {
      image: { tall, wide },
    });
  }
}
