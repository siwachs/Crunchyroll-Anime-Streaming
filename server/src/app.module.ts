import { Module, OnModuleInit } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesModule } from './series/series.module';
import { GenreModule } from './genre/genre.module';
import { SeasonModule } from './season/season.module';
import { EpisodeModule } from './episode/episode.module';
import { MetaTagModule } from './meta-tag/meta-tag.module';
import { FirebaseModule } from './firebase/firebase.module';
import { KafkaModule } from './kafka/kafka.module';
import { HlsModule } from './hls/hls.module';
import { ValidatorAndDataProcessingModule } from './validator-and-data-processing/validator-and-data-processing.module';

import { KafkaService } from './kafka/kafka.service';
import { SeriesConsumerService } from './series/series.consumer.service';
import { EpisodeConsumerService } from './episode/episode.consumer.service';

import {
  SERIES_IMAGES_UPLOADS,
  SEASON_EPISODE_THUMBNAIL_UPLOADS,
  MEDIA_UPLOADS_TRANSCODE_TO_HLS,
  TRANSCODED_MEDIA_UPLOADS,
} from './common/constants/kafkaTopics';

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
    FirebaseModule,
    ValidatorAndDataProcessingModule,
    KafkaModule.register({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: JSON.parse(process.env.KAFKA_BROKERS),
    }),
    HlsModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly seriesConsumerService: SeriesConsumerService,
    private readonly episodeConsumerService: EpisodeConsumerService,
  ) {}

  async onModuleInit() {
    await this.kafkaService.addConsumer(
      SERIES_IMAGES_UPLOADS,
      `${SERIES_IMAGES_UPLOADS}-group`,
      this.seriesConsumerService.uploadImages.bind(this.seriesConsumerService),
    );

    await this.kafkaService.addConsumer(
      SEASON_EPISODE_THUMBNAIL_UPLOADS,
      `${SEASON_EPISODE_THUMBNAIL_UPLOADS}-group`,
      this.episodeConsumerService.uploadThumbnail.bind(
        this.episodeConsumerService,
      ),
    );

    await this.kafkaService.addConsumer(
      MEDIA_UPLOADS_TRANSCODE_TO_HLS,
      `${MEDIA_UPLOADS_TRANSCODE_TO_HLS}-group`,
      this.episodeConsumerService.transcodeUploadedMediaToHLS.bind(
        this.episodeConsumerService,
      ),
    );

    await this.kafkaService.addConsumer(
      TRANSCODED_MEDIA_UPLOADS,
      `${TRANSCODED_MEDIA_UPLOADS}-group`,
      this.episodeConsumerService.uploadTranscodedMedia.bind(
        this.episodeConsumerService,
      ),
    );
  }
}
