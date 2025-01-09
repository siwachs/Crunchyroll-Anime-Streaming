import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MetaTag } from './schemas/meta-tag.schema';

import { CreateMetaTagDto, EditMetaTagDto } from './schemas/dto/meta-tag.dto';
import { DUPLICATE_KEY_ERROR } from '../common/constants/mongoose';

@Injectable()
export class MetaTagService {
  constructor(
    @InjectModel(MetaTag.name) private readonly metaTagModel: Model<MetaTag>,
  ) {}

  async getMetaTags(): Promise<MetaTag[]> {
    return this.metaTagModel.find({}).exec();
  }

  async searchMetaTag(title: string): Promise<MetaTag[]> {
    return this.metaTagModel
      .find({ title: { $regex: new RegExp(title, 'i') } })
      .exec();
  }

  async createMetaTag(dto: CreateMetaTagDto): Promise<MetaTag> {
    try {
      const newMetaTagDoc = new this.metaTagModel(dto);

      return await newMetaTagDoc.save();
    } catch (error) {
      if (error.code === DUPLICATE_KEY_ERROR)
        throw new HttpException(
          'MetaTag with this title already exist.',
          HttpStatus.CONFLICT,
        );

      throw error;
    }
  }

  async editMetaTag(id: string, dto: EditMetaTagDto) {
    const updatedMetaTag = await this.metaTagModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedMetaTag) throw new NotFoundException('MetaTag does not exist!');

    return updatedMetaTag;
  }

  async deleteMetaTag(id: string) {
    const deletedMetaTag = await this.metaTagModel.deleteOne({ _id: id });
    if (deletedMetaTag.deletedCount === 0)
      throw new NotFoundException('MetaTag does not exist!');
  }
}
