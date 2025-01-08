import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService]
})
export class EpisodeModule {}
