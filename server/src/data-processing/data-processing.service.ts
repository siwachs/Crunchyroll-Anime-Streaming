import { Injectable } from '@nestjs/common';

import * as path from 'path';

@Injectable()
export class DataProcessingService {
  renameFile(file: Express.Multer.File, newName: string): Express.Multer.File {
    const extension = path.extname(file.originalname);
    const newFileName = `${newName}${extension}`;

    return { ...file, originalname: newFileName };
  }
}
