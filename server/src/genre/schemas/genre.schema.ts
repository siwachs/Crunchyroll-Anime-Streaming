import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ collection: 'Genres', timestamps: true })
export class Genre {
  @Prop({ type: String, required: true, unique: true })
  title: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
