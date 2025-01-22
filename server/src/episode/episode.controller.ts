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
import { ValidatorService } from 'src/validator/validator.service';
import { DataProcessingService } from 'src/data-processing/data-processing.service';

import { CreateEpisodeFormDto } from './schemas/dto/episode.dto';

import {
  IMAGE_ALLOWED_MIME_TYPES,
  THUMBNAIL_MAX_SIZE_IN_MB,
  MEDIA_ALLOWED_MIME_TYPES,
  MEDIA_MAX_SIZE_IN_MB,
} from 'src/common/constants/file';

@Controller('episodes')
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly validatorService: ValidatorService,
    private readonly dataProcessingService: DataProcessingService,
  ) {}

  @Post(':seriesId/:seasonId')
  @UseInterceptors(FileInterceptor('thumbnail'))
  createEdisode(
    @Param('seriesId') seriesId: string,
    @Param('seasonId') seasonId: string,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() dto: CreateEpisodeFormDto,
  ) {
    if (!thumbnail) throw new BadRequestException('Thumbnail is requied.');

    this.validatorService.validateFile(thumbnail, {
      allowedMimeTypes: IMAGE_ALLOWED_MIME_TYPES,
      maxSize: THUMBNAIL_MAX_SIZE_IN_MB,
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

  @Post(':seriesId/:seasonId/:episodeId')
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
  uploadMedia(
    @Param('seriesId') seriesId: string,
    @Param('seasonId') seasonId: string,
    @Param('episodeId') episodeId: string,
    @UploadedFile() media: Express.Multer.File,
  ) {
    if (!media) throw new BadRequestException('Media is required.');

    return this.episodeService.uploadMedia(
      seriesId,
      seasonId,
      episodeId,
      media,
    );
  }
}
