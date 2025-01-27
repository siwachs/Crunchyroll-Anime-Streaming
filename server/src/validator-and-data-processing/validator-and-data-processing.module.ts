import { Module, Global } from '@nestjs/common';

import { ValidatorAndDataProcessingService } from './validator-and-data-processing.service';

@Global()
@Module({
  providers: [ValidatorAndDataProcessingService],
  exports: [ValidatorAndDataProcessingService],
})
export class ValidatorAndDataProcessingModule {}
