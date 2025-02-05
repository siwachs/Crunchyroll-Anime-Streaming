import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Genre } from 'src/genre/schemas/genre.schema';
import { MetaTag } from 'src/meta-tag/schemas/meta-tag.schema';
import { Season } from 'src/season/schemas/season.schema';

export type SeriesDocument = HydratedDocument<Series>;

@Schema({ collection: 'Series', timestamps: true })
export class Series {
  @Prop({
    type: {
      name: { type: String, required: true },
      tall: { type: String, required: true },
      wide: { type: String, required: true },
    },
    required: true,
    _id: false,
  })
  banner: {
    name: string;
    tall: string;
    wide: string;
  };

  @Prop({
    type: {
      raw: { type: String, required: true },
      tall: { type: String, required: true },
      wide: { type: String, required: true },
    },
    required: true,
    _id: false,
  })
  poster: {
    raw: string;
    tall: string;
    wide: string;
  };

  @Prop({ type: String, required: true })
  thumbnail: string;

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

  @Prop({ type: String, required: true })
  licence: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }],
  })
  seasons: Season[];

  @Prop({
    type: Date,
    default: () => new Date(),
  })
  seriesUpdatedOn: Date;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
