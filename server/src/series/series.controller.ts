import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { SeriesService } from './series.service';
import { ValidatorService } from '../validator/validator.service';
import { DataProcessingService } from '../data-processing/data-processing.service';

import { CreateSeriesFormDto } from './schemas/dto/series.dto';
import { ALLOWED_MIME_TYPES } from 'src/common/constants/file';
const MAX_FILE_SIZE_IN_MB = 6;

@Controller('series')
export class SeriesController {
  constructor(
    private readonly seriesService: SeriesService,
    private readonly validatorService: ValidatorService,
    private readonly dataProcessingService: DataProcessingService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image.tall', maxCount: 1 },
      { name: 'image.wide', maxCount: 1 },
    ]),
  )
  createSeries(
    @UploadedFiles()
    files: {
      'image.tall'?: Express.Multer.File[];
      'image.wide'?: Express.Multer.File[];
    },
    @Body() dto: CreateSeriesFormDto,
  ) {
    const tallImage = files['image.tall']?.[0];
    const wideImage = files['image.wide']?.[0];
    if (!tallImage || !wideImage)
      throw new BadRequestException('The tall and wide image are required.');

    this.validatorService.validateFile(tallImage, {
      allowedMimeTypes: ALLOWED_MIME_TYPES,
      maxSize: MAX_FILE_SIZE_IN_MB,
    });
    this.validatorService.validateFile(wideImage, {
      allowedMimeTypes: ALLOWED_MIME_TYPES,
      maxSize: MAX_FILE_SIZE_IN_MB,
    });

    const renamedTallImage = this.dataProcessingService.renameFile(
      tallImage,
      'tall',
    );
    const renamedWideImage = this.dataProcessingService.renameFile(
      wideImage,
      'wide',
    );

    return this.seriesService.createSeries(
      [renamedTallImage, renamedWideImage],
      dto,
    );
  }
}
