import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';

import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { EpisodeService } from './episode.service';
import { ValidatorAndDataProcessingService } from 'src/validator-and-data-processing/validator-and-data-processing.service';

import { CreateEpisodeFormDto } from './schemas/dto/episode.dto';

import {
  MEDIA_ALLOWED_MIME_TYPES,
  MEDIA_MAX_SIZE_IN_MB,
} from 'src/common/constants/file';

@Controller('episodes')
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly validatorAndDataProcessingService: ValidatorAndDataProcessingService,
  ) {}

  @Post(':seriesId/:seasonId')
  @UseInterceptors(
    FileInterceptor('media', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${randomBytes(12).toString('hex').slice(0, 16)}${extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (MEDIA_ALLOWED_MIME_TYPES.includes(file.mimetype))
          return cb(null, true);

        cb(
          new BadRequestException(
            `File: ${file.originalname} is Invalid. Only ${MEDIA_ALLOWED_MIME_TYPES.join(', ')} are allowed.`,
          ),
          false,
        );
      },
      limits: { fileSize: MEDIA_MAX_SIZE_IN_MB * 1024 * 1024 },
    }),
  )
  createEdisode(
    @Param('seriesId') seriesId: string,
    @Param('seasonId') seasonId: string,
    @UploadedFile() media: Express.Multer.File,
    @Body() dto: CreateEpisodeFormDto,
  ) {
    if (!media) throw new BadRequestException('Media is required.');

    return this.episodeService.createEpisode(seriesId, seasonId, media, dto);
  }
}
