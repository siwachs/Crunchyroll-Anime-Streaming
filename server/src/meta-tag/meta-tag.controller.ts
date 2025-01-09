import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { MetaTagService } from './meta-tag.service';

import { CreateMetaTagDto, EditMetaTagDto } from './schemas/dto/meta-tag.dto';

@Controller('meta-tags')
export class MetaTagController {
  constructor(private readonly metaTagService: MetaTagService) {}

  @Get()
  getMetaTags() {
    return this.metaTagService.getMetaTags();
  }

  @Get(':title')
  searchMetaTag(@Param('title') title: string) {
    return this.metaTagService.searchMetaTag(title);
  }

  @Post()
  createMetaTag(@Body() dto: CreateMetaTagDto) {
    return this.metaTagService.createMetaTag(dto);
  }

  @Patch(':id')
  editMetaTag(@Param('id') id: string, @Body() dto: EditMetaTagDto) {
    return this.metaTagService.editMetaTag(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteMetaTag(@Param('id') id: string) {
    return this.metaTagService.deleteMetaTag(id);
  }
}
