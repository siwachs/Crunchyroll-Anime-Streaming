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

import { GenreService } from './genre.service';

import { CreateGenreDto, EditGenreDto } from './schemas/dto/genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getGenres() {
    return this.genreService.getGenres();
  }

  @Get(':title')
  searchGenre(@Param('title') title: string) {
    return this.genreService.searchGenre(title);
  }

  @Post()
  createGenre(@Body() dto: CreateGenreDto) {
    return this.genreService.createGenre(dto);
  }

  @Patch(':id')
  editGenre(@Param('id') id: string, @Body() dto: EditGenreDto) {
    return this.genreService.editGenre(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteGenre(@Param('id') id: string) {
    return this.genreService.deleteGenre(id);
  }
}
