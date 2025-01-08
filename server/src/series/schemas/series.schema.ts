import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MetaTag } from '../../meta-tag/schemas/meta-tag.schema';
import { Genre } from '../../genre/schemas/genre.schema';
import { Season } from '../../season/schemas/season.schema';

export type SeriesDocument = HydratedDocument<Series>;

@Schema()
export class Series {
  @Prop({
    type: {
      tall: { type: String, required: true },
      wide: { type: String, required: true },
    },
    required: true,
  })
  image: {
    tall: string;
    wide: string;
  };

  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MetaTag' }],
    required: true,
  })
  metaTags: MetaTag[];

  @Prop({ type: Number, default: 0 })
  averageRating: number;

  @Prop({ type: Number, default: 0 })
  totalRating: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    required: true,
  })
  genres: Genre[];

  @Prop({ type: Object, required: true })
  details: Record<string, string>;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }],
    required: true,
  })
  seasons: Season[];
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
