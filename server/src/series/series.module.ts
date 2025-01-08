import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
