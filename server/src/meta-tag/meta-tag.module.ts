import { Module } from '@nestjs/common';
import { MetaTagController } from './meta-tag.controller';
import { MetaTagService } from './meta-tag.service';

import { MongooseModule } from '@nestjs/mongoose';

import { MetaTag, MetaTagSchema } from './schemas/meta-tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MetaTag.name, schema: MetaTagSchema }]),
  ],
  controllers: [MetaTagController],
  providers: [MetaTagService],
})
export class MetaTagModule {}
