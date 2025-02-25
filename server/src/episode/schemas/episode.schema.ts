import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Series } from 'src/series/schemas/series.schema';
import { Season } from 'src/season/schemas/season.schema';
import { MetaTag } from 'src/meta-tag/schemas/meta-tag.schema';

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema({ collection: 'Episodes', timestamps: true })
export class Episode {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  series: Series;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  season: Season;

  @Prop({ type: String, default: 'Uploading...' })
  thumbnail: string;

  @Prop({ type: Number, default: 0 })
  duration: number;

  @Prop({ type: String, default: '' })
  episode: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MetaTag' }],
    required: true,
  })
  metaTags: MetaTag[];

  @Prop({ type: Date, required: true })
  releaseDate: Date;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  dislikes: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Object, required: true })
  details: Record<string, string>;

  @Prop({ type: String, default: 'Uploading...' })
  media: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
