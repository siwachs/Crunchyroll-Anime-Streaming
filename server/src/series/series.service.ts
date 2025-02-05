import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SeriesProducerService } from './series.producer.service';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Series } from './schemas/series.schema';

import { CreateSeriesFormDto, CreateSeriesDto } from './schemas/dto/series.dto';
import { DUPLICATE_KEY_ERROR } from 'src/common/constants/mongoose';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private readonly seriesModel: Model<Series>,
    private readonly seriesProducerService: SeriesProducerService,
  ) {}

  async createSeries(
    images: Record<string, Express.Multer.File | null>,
    dto: any,
  ) {
    try {
      const extendedDto: CreateSeriesDto = {
        ...dto,
        thumbnail: 'Uploading...',
        banner: {
          name: 'Uploading...',
          tall: 'Uploading...',
          wide: 'Uploading...',
        },
        poster: {
          raw: 'Uploading...',
          tall: 'Uploading...',
          wide: 'Uploading...',
        },
      };
      // const newSeriesDoc = new this.seriesModel(extendedDto);
      // const newSeries = await newSeriesDoc.save();

      // this.seriesProducerService.sendImagesUploadsMessage(
      //   newSeries._id.toString(),
      //   images,
      // );

      // return newSeries;

      this.seriesProducerService.sendImagesUploadsMessage(dto.seriesId, images);
      return dto.seriesId;

      // return newSeries;
    } catch (error) {
      if (error.code === DUPLICATE_KEY_ERROR)
        throw new HttpException(
          'Series with this title already exist.',
          HttpStatus.CONFLICT,
        );

      throw error;
    }
  }
}
