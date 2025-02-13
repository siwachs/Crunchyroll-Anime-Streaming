import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Episode } from 'src/episode/schemas/episode.schema';

export type SeasonDocument = HydratedDocument<Season>;

@Schema({ collection: 'Seasons', timestamps: true })
export class Season {
  @Prop({ type: Number, default: -1 })
  season: number;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
    required: true,
  })
  episodes: Episode[];
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
