import { Controller, Post, Param, Body } from '@nestjs/common';

import { SeasonService } from './season.service';

import { CreateSeasonDto } from './schemas/dto/season.dto';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Post(':seriesId')
  createSeason(
    @Param('seriesId') seriesId: string,
    @Body() dto: CreateSeasonDto,
  ) {
    return this.seasonService.createSeason(seriesId, dto);
  }
}
