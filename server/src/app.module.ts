import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { SeriesModule } from './series/series.module';
import { GenreModule } from './genre/genre.module';
import { SeasonModule } from './season/season.module';
import { EpisodeModule } from './episode/episode.module';
import { MetaTagModule } from './meta-tag/meta-tag.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SeriesModule,
    GenreModule,
    SeasonModule,
    EpisodeModule,
    MetaTagModule,
  ],
})
export class AppModule {}
