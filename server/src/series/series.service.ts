import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { SeriesProducerService } from './series.producer.service';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Series } from './schemas/series.schema';

import { CreateSeriesFormDto, CreateSeriesDto } from './schemas/dto/series.dto';
import { DUPLICATE_KEY_ERROR } from '../common/constants/mongoose';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private readonly seriesModel: Model<Series>,
    private readonly seriesProducerService: SeriesProducerService,
  ) {}

  async createSeries(files: Express.Multer.File[], dto: CreateSeriesFormDto) {
    try {
      const extendedDto: CreateSeriesDto = {
        ...dto,
        image: {
          tall: 'Uploading...',
          wide: 'Uploading...',
        },
      };

      const newSeriesDoc = new this.seriesModel(extendedDto);
      const newSeries = await newSeriesDoc.save();

      await this.seriesProducerService.sendSeriesPosterUploadsMessage(
        newSeries._id.toString(),
        files,
      );

      return newSeries;
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
