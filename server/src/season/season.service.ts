import { Injectable, BadRequestException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Season } from './schemas/season.schema';
import { Series } from 'src/series/schemas/series.schema';

import { CreateSeasonDto } from './schemas/dto/season.dto';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name) private readonly seasonModel: Model<Season>,
    @InjectModel(Series.name) private readonly seriesModel: Model<Series>,
  ) {}

  async createSeason(seriesId: string, dto: CreateSeasonDto) {
    const series = await this.seriesModel
      .findOne({
        _id: seriesId,
      })
      .select('_id')
      .exec();
    if (!series)
      throw new BadRequestException(
        'The season you are trying to create belongs to a series that does not exist.',
      );

    const newSeasonDoc = new this.seasonModel(dto);
    const newSeason = await newSeasonDoc.save();

    await this.seriesModel
      .findByIdAndUpdate(seriesId, {
        $push: { seasons: newSeason._id },
      })
      .exec();

    return newSeason;
  }
}
