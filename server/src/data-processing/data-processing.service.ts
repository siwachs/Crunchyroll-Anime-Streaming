import { Injectable } from '@nestjs/common';

import { extname } from 'path';

import { File } from 'src/common/types';

@Injectable()
export class DataProcessingService {
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
