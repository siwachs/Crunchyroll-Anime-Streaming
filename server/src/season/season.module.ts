import { Module } from '@nestjs/common';

import { SeasonController } from './season.controller';

import { SeasonService } from './season.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from './schemas/season.schema';
import { Series, SeriesSchema } from 'src/series/schemas/series.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Season.name, schema: SeasonSchema },
      { name: Series.name, schema: SeriesSchema },
    ]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
