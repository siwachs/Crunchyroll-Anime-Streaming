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
import { DataProcessingModule } from './data-processing/data-processing.module';
import { KafkaModule } from './kafka/kafka.module';

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
    DataProcessingModule,
    KafkaModule.register({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: JSON.parse(process.env.KAFKA_BROKERS),
    }),
  ],
})
export class AppModule {}
