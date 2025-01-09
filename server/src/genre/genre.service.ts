import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genre.schema';

import { CreateGenreDto, EditGenreDto } from './schemas/dto/genre.dto';
import { DUPLICATE_KEY_ERROR } from '../common/constants/mongoose';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {}

  async getGenres(): Promise<Genre[]> {
    return this.genreModel.find({}).exec();
  }

  async searchGenre(title: string): Promise<Genre[]> {
    return this.genreModel
      .find({ title: { $regex: new RegExp(title, 'i') } })
      .exec();
  }

  async createGenre(dto: CreateGenreDto): Promise<Genre> {
    try {
      const newGenreDoc = new this.genreModel(dto);

      return await newGenreDoc.save();
    } catch (error) {
      if (error.code === DUPLICATE_KEY_ERROR)
        throw new HttpException(
          'Genre with this title already exist.',
          HttpStatus.CONFLICT,
        );

      throw error;
    }
  }

  async editGenre(id: string, dto: EditGenreDto) {
    const updatedGenre = await this.genreModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedGenre) throw new NotFoundException('Genre does not exist!');

    return updatedGenre;
  }

  async deleteGenre(id: string) {
    const deletedGenre = await this.genreModel.deleteOne({ _id: id });
    if (deletedGenre.deletedCount === 0)
      throw new NotFoundException('Genre does not exist!');
  }
}
