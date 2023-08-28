import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Image3DModel, Image3DModelSchema } from './image-model.js';
import { Field } from '@nestjs/graphql';

@Schema({ timestamps: true })
export class CompanySector {
  @Field({ description: 'Title of the sector' })
  @Prop({ required: true, unique: true }) //TODO: CHECK WHY IS NOT GENERATING INDEXES
  title: string;

  @Prop({ type: Image3DModelSchema, required: true })
  imageModel: Image3DModel;
}

export const CompanySectorSchema = SchemaFactory.createForClass(CompanySector);
