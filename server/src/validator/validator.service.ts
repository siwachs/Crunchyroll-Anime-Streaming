import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';

@Injectable()
export class ValidatorService {
  validateFile(
    file: Express.Multer.File,
    options: { allowedMimeTypes: string[]; maxSize: number },
  ) {
    this.validateMimeType(file, options.allowedMimeTypes);
    this.validateFileSize(file, options.maxSize);
  }

  private validateMimeType(
    file: Express.Multer.File,
    allowedMimeTypes: string[],
  ) {
    if (!allowedMimeTypes.includes(file.mimetype))
      throw new UnsupportedMediaTypeException(
        `File: ${file.originalname} is Invalid. Only ${allowedMimeTypes.join(', ')} are allowed.`,
      );
  }

  private validateFileSize(file: Express.Multer.File, maxSize: number) {
    const maxSizeInBytes = maxSize * 1024 * 1024;

    if (file.size > maxSizeInBytes)
      throw new UnsupportedMediaTypeException(
        `File: ${file.originalname} is exceeds the limit of ${maxSize} MB`,
      );
  }
}
