import { Module } from '@nestjs/common';

import { SeriesController } from './series.controller';

import { SeriesService } from './series.service';
import { SeriesProducerService } from './series.producer.service';
import { SeriesConsumerService } from './series.consumer.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from './schemas/series.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService, SeriesProducerService, SeriesConsumerService],
  exports: [SeriesConsumerService],
})
export class SeriesModule {}
