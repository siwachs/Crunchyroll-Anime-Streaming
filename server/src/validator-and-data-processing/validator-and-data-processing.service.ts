import { extname } from 'path';
import { createHash } from 'crypto';
import {
  Injectable,
  UnsupportedMediaTypeException,
  BadRequestException,
} from '@nestjs/common';

import { File } from 'src/common/types';

@Injectable()
export class ValidatorAndDataProcessingService {
  compareFiles(file1: Express.Multer.File, file2: Express.Multer.File) {
    if (file1.mimetype !== file2.mimetype) return;

    if (file1.size !== file2.size) return;

    const file1Hash = createHash('sha256').update(file1.buffer).digest('hex');
    const file2Hash = createHash('sha256').update(file2.buffer).digest('hex');

    if (file1Hash === file2Hash)
      throw new BadRequestException(
        `File: ${file1.originalname} and File: ${file2.originalname} are same files.`,
      );
  }

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
