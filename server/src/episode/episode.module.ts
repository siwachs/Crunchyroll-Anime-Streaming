import { Module } from '@nestjs/common';

import { EpisodeController } from './episode.controller';

import { EpisodeService } from './episode.service';
import { EpisodeProducerService } from './episode.producer.service';
import { EpisodeConsumerService } from './episode.consumer.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from 'src/series/schemas/series.schema';
import { Season, SeasonSchema } from 'src/season/schemas/season.schema';
import { Episode, EpisodeSchema } from './schemas/episode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Series.name, schema: SeriesSchema },
      { name: Season.name, schema: SeasonSchema },
      { name: Episode.name, schema: EpisodeSchema },
    ]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService, EpisodeProducerService, EpisodeConsumerService],
  exports: [EpisodeConsumerService],
})
export class EpisodeModule {}
