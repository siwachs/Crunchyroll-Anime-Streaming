import { Module } from '@nestjs/common';
import { MetaTagController } from './meta-tag.controller';
import { MetaTagService } from './meta-tag.service';

@Module({
  controllers: [MetaTagController],
  providers: [MetaTagService]
})
export class MetaTagModule {}
