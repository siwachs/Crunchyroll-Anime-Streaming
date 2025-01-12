import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesModule } from './series/series.module';
import { GenreModule } from './genre/genre.module';
import { SeasonModule } from './season/season.module';
import { EpisodeModule } from './episode/episode.module';
import { MetaTagModule } from './meta-tag/meta-tag.module';
import { ValidatorModule } from './validator/validator.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      autoIndex: true,
    }),
    SeriesModule,
    GenreModule,
    SeasonModule,
    EpisodeModule,
    MetaTagModule,
    ValidatorModule,
    FirebaseModule,
  ],
})
export class AppModule {}
