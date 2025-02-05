import { Injectable } from '@nestjs/common';

import { ValidatorAndDataProcessingService } from 'src/validator-and-data-processing/validator-and-data-processing.service';
import { FirebaseService } from '../firebase/firebase.service';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Series } from './schemas/series.schema';

import { File } from 'src/common/types';
import { SERIES_BASE_STORAGE_REF } from 'src/common/constants/firebase';

@Injectable()
export class SeriesConsumerService {
  constructor(
    private readonly validatorAndDataProcessingService: ValidatorAndDataProcessingService,
    @InjectModel(Series.name) private readonly seriesModel: Model<Series>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async uploadImages(message: {
    docId: string;
    files: Record<string, File | null>;
  }) {
    const { docId, files } = message;
    console.log(`Uploading ${docId}'s images to firebase...`);

    const thumbnail = files['thumbnail'];
    const bannerImages = [
      files['banner.name'],
      files['banner.tall'],
      files['banner.wide'],
    ].map((file) =>
      file === null
        ? file
        : this.validatorAndDataProcessingService.base64StringToFileBuffer(file),
    );
    const posterImages = [
      files['poster.raw'],
      files['poster.tall'],
      files['poster.wide'],
    ].map((file) =>
      file === null
        ? file
        : this.validatorAndDataProcessingService.base64StringToFileBuffer(file),
    );

    const thumbnailURL = await this.firebaseService.uploadFiles(
      [thumbnail],
      `${SERIES_BASE_STORAGE_REF}/${docId}`,
    );
    // const uploadedBannerURLs = await this.firebaseService.uploadFiles(
    //   bannerImages.filter((file) => file !== null),
    //   `${SERIES_BASE_STORAGE_REF}/${docId}/banner`,
    // );
    // const uploadedPosterURLs = await this.firebaseService.uploadFiles(
    //   posterImages.filter((file) => file !== null),
    //   `${SERIES_BASE_STORAGE_REF}/${docId}/poster`,
    // );

    // await this.seriesModel
    //   .findByIdAndUpdate(docId, {
    //     thumbnail: thumbnailURL['thumbnail'],
    //     banner: {
    //       name: uploadedBannerURLs['name'],
    //       tall: uploadedBannerURLs['tall'] || uploadedPosterURLs['tall'],
    //       wide: uploadedBannerURLs['wide'],
    //     },
    //     poster: {
    //       raw: uploadedPosterURLs['raw'],
    //       tall: uploadedPosterURLs['tall'] || uploadedBannerURLs['tall'],
    //       wide: uploadedPosterURLs['wide'],
    //     },
    //   })
    //   .exec();
    await this.seriesModel
      .findByIdAndUpdate(docId, {
        thumbnail: thumbnailURL['thumbnail'],
      })
      .exec();

    console.log(`${docId}'s images are uploaded`);
  }
}
