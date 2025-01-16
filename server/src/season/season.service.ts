import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Season } from './schemas/season.schema';
import { Series } from 'src/series/schemas/series.schema';

import { CreateSeasonDto } from './schemas/dto/season.dto';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(Season.name) private readonly seasonSchema: Model<Season>,
    @InjectModel(Series.name) private readonly seriesSchema: Model<Series>,
  ) {}

  async createSeason(seriesId: string, dto: CreateSeasonDto) {
    const newSeasonDoc = new this.seasonSchema(dto);
    const newSeason = await newSeasonDoc.save();

    await this.seriesSchema
      .findByIdAndUpdate(seriesId, {
        $push: { seasons: newSeason._id },
      })
      .exec();

    return newSeason;
  }
}
