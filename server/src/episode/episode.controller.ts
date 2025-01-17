import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { EpisodeService } from './episode.service';
import { ValidatorService } from 'src/validator/validator.service';
import { DataProcessingService } from 'src/data-processing/data-processing.service';

import { CreateEpisodeFormDto } from './schemas/dto/episode.dto';

import { ALLOWED_MIME_TYPES } from 'src/common/constants/file';
const MAX_FILE_SIZE_IN_MB = 4;

@Controller('episodes')
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly validatorService: ValidatorService,
    private readonly dataProcessingService: DataProcessingService,
  ) {}

  @Post(':seriesId/:seasonId')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'thumbnail', maxCount: 1 }]))
  createEdisode(
    @Param('seriesId') seriesId: string,
    @Param('seasonId') seasonId: string,
    @UploadedFiles() files: { thumbnail?: Express.Multer.File[] },
    @Body() dto: CreateEpisodeFormDto,
  ) {
    const thumbnail = files['thumbnail']?.[0];
    if (!thumbnail)
      throw new BadRequestException('The thumbnail and media are required.');

    this.validatorService.validateFile(thumbnail, {
      allowedMimeTypes: ALLOWED_MIME_TYPES,
      maxSize: MAX_FILE_SIZE_IN_MB,
    });

    const renamedThumbnail = this.dataProcessingService.renameFile(
      thumbnail,
      'thumbnail',
    );

    return this.episodeService.createEpisode(
      seriesId,
      seasonId,
      renamedThumbnail,
      dto,
    );
  }
}
