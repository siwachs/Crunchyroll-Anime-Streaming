import { Module } from '@nestjs/common';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService]
})
export class SeasonModule {}
