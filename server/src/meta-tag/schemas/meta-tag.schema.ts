import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MetaTagDocument = HydratedDocument<MetaTag>;

@Schema()
export class MetaTag {
  @Prop({ type: String, required: true, unique: true })
  title: string;
}

export const MetaTagSchema = SchemaFactory.createForClass(MetaTag);
