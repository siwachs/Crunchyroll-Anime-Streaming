import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MetaTag } from '../../meta-tag/schemas/meta-tag.schema';

export type EpisodeDocument = HydratedDocument<Episode>;

@Schema()
export class Episode {
  @Prop({ required: true })
  poster: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MetaTag' }],
    required: true,
  })
  metaTags: MetaTag[];

  @Prop({ required: true })
  media: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
