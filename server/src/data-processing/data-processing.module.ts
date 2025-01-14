import { Module, Global } from '@nestjs/common';

import { DataProcessingService } from './data-processing.service';

@Global()
@Module({
  providers: [DataProcessingService],
  exports: [DataProcessingService],
})
export class DataProcessingModule {}
