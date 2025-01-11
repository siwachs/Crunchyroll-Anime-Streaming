import { Module, Global } from '@nestjs/common';

import { ValidatorService } from './validator.service';

@Global()
@Module({
  providers: [ValidatorService],
  exports: [ValidatorService],
})
export class ValidatorModule {}
