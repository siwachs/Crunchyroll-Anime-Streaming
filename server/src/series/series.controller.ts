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
import { ValidatorAndDataProcessingService } from 'src/validator-and-data-processing/validator-and-data-processing.service';

import { CreateSeriesFormDto } from './schemas/dto/series.dto';
import {
  IMAGE_ALLOWED_MIME_TYPES,
  IMAGE_MAX_SIZE_IN_MB,
} from 'src/common/constants/file';

@Controller('series')
export class SeriesController {
  constructor(
    private readonly seriesService: SeriesService,
    private readonly validatorAndDataProcessingService: ValidatorAndDataProcessingService,
  ) {}

  private validateImagePairs(
    file1: Express.Multer.File,
    fieldname1: string,
    file2: Express.Multer.File,
    fieldname2: string,
  ) {
    if (!file1 && !file2)
      throw new BadRequestException(
        `Either ${fieldname1} or ${fieldname2} must be provided, or both. Neither can be empty.`,
      );

    if (
      file1 &&
      file2 &&
      this.validatorAndDataProcessingService.compareFiles(file1, file2)
    )
      throw new BadRequestException(
        `File: ${file1.originalname} in ${file1.fieldname} field and File: ${file2.originalname} in ${file2.fieldname} field can not have same files either remove one of them or select different files.`,
      );

    [file1, file2]
      .filter((file) => file !== undefined)
      .forEach((file) =>
        this.validatorAndDataProcessingService.validateFileMimeTypeAndSize(
          file,
          {
            allowedMimeTypes: IMAGE_ALLOWED_MIME_TYPES,
            maxSize: IMAGE_MAX_SIZE_IN_MB,
          },
        ),
      );
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'banner.name', maxCount: 1 },
      { name: 'banner.tall', maxCount: 1 },
      { name: 'banner.wide', maxCount: 1 },
      { name: 'poster.tall', maxCount: 1 },
      { name: 'poster.wide', maxCount: 1 },
    ]),
  )
  createSeries(
    @UploadedFiles()
    files: {
      'banner.name'?: Express.Multer.File[];
      'banner.tall'?: Express.Multer.File[];
      'banner.wide'?: Express.Multer.File[];
      'poster.tall'?: Express.Multer.File[];
      'poster.wide'?: Express.Multer.File[];
    },
    @Body() dto: CreateSeriesFormDto,
  ) {
    const filesKeys = [
      'banner.name',
      'banner.tall',
      'banner.wide',
      'poster.tall',
      'poster.wide',
    ];

    const images = filesKeys.reduce((acc, key) => {
      acc[key] = files[key]?.[0];

      return acc;
    }, {});

    if (
      !images['banner.name'] ||
      !images['banner.wide'] ||
      !images['poster.wide']
    )
      throw new BadRequestException(
        'banner.name, banner.wide and poster.wide are required.',
      );

    this.validateImagePairs(
      images['banner.tall'],
      'banner.tall',
      images['poster.tall'],
      'poster.tall',
    );

    const renamedImages = Object.keys(images).reduce((acc, key) => {
      acc[key] = images[key]
        ? this.validatorAndDataProcessingService.renameFile(
            images[key],
            key.split('.')[1],
          )
        : null;

      return acc;
    }, {});

    return this.seriesService.createSeries(renamedImages, dto);
  }
}
