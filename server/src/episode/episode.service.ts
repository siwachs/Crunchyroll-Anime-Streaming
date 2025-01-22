import { Injectable, BadRequestException } from '@nestjs/common';

import { EpisodeProducerService } from './episode.producer.service';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Series } from 'src/series/schemas/series.schema';
import { Season } from 'src/season/schemas/season.schema';
import { Episode } from './schemas/episode.schema';

import {
  CreateEpisodeFormDto,
  CreateEpisodeDto,
} from './schemas/dto/episode.dto';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(Series.name) private readonly seriesModel: Model<Series>,
    @InjectModel(Season.name) private readonly seasonModel: Model<Season>,
    @InjectModel(Episode.name) private readonly episodeModel: Model<Episode>,
    private readonly episodeProducerService: EpisodeProducerService,
  ) {}

  async createEpisode(
    seriesId: string,
    seasonId: string,
    thumbnail: Express.Multer.File,
    dto: CreateEpisodeFormDto,
  ) {
    const series = await this.seriesModel
      .findOne({
        _id: seriesId,
        seasons: { $in: [seasonId] },
      })
      .select('_id')
      .exec();
    if (!series)
      throw new BadRequestException(
        'The episode you are creating for the season is not associated with the specified series.',
      );

    const extendedDto: CreateEpisodeDto = {
      ...dto,
      thumbnail: 'Uploading...',
      media: 'Uploading...',
    };

    const newEpisodeDoc = new this.episodeModel(extendedDto);
    const newEpisode = await newEpisodeDoc.save();

    await this.seasonModel
      .findByIdAndUpdate(seasonId, {
        $push: { episodes: newEpisode._id },
      })
      .exec();

    await this.episodeProducerService.sendThumbnailUploadsMessage(
      seriesId,
      seasonId,
      newEpisode._id.toString(),
      thumbnail,
    );

    return newEpisode;
  }

  async uploadMedia(
    seriesId: string,
    seasonId: string,
    episodeId: string,
    media: Express.Multer.File,
  ) {
    await this.episodeProducerService.sendMediaUploadsTranscodeMessage(
      seriesId,
      seasonId,
      episodeId,
      media.path,
    );

    return {
      media: 'Uploading...',
    };
  }
}
