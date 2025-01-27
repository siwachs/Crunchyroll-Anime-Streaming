import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';

import { extname } from 'path';

import { File } from 'src/common/types';

@Injectable()
export class ValidatorAndDataProcessingService {
  validateFileMimeTypeAndSize(
    file: Express.Multer.File,
    options: { allowedMimeTypes: string[]; maxSize: number },
  ) {
    this.validateFileMimeType(file, options.allowedMimeTypes);
    this.validateFileSize(file, options.maxSize);
  }

  validateFileMimeType(file: Express.Multer.File, allowedMimeTypes: string[]) {
    if (!allowedMimeTypes.includes(file.mimetype))
      throw new UnsupportedMediaTypeException(
        `File: ${file.originalname} is Invalid. Only ${allowedMimeTypes.join(', ')} are allowed.`,
      );
  }

  validateFileSize(file: Express.Multer.File, maxSize: number) {
    const maxSizeInBytes = maxSize * 1024 * 1024;

    if (file.size > maxSizeInBytes)
      throw new UnsupportedMediaTypeException(
        `File: ${file.originalname} is exceeds the limit of ${maxSize} MB`,
      );
  }

  renameFile(
    file: Express.Multer.File,
    newName: string,
    withExtension = false,
  ): Express.Multer.File {
    const newFileName = `${newName}${withExtension ? extname(file.originalname) : ''}`;

    return { ...file, originalname: newFileName };
  }

  fileBufferToBase64String(file: Express.Multer.File): File {
    return {
      originalname: file.originalname,
      buffer: file.buffer.toString('base64'),
      mimetype: file.mimetype,
      fieldname: file.fieldname,
    };
  }

  base64StringToFileBuffer(file: File): File {
    return {
      originalname: file.originalname,
      buffer: Buffer.from(file.buffer as string, 'base64'),
      mimetype: file.mimetype,
      fieldname: file.fieldname,
    };
  }
}
