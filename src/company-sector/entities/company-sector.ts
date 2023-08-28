import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Image3DModel, Image3DModelSchema } from './image-model.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType({ description: 'Company sector that a company can have' })
export class CompanySector {
  @Field(() => ID, { description: 'ID of the sector' })
  _id: Types.ObjectId;

  @Field({ description: 'Title of the sector' })
  @Prop({ required: true, unique: true }) //TODO: CHECK WHY IS NOT GENERATING INDEXES
  title: string;

  @Prop({ type: Image3DModelSchema, required: true })
  imageModel: Image3DModel;
}

export const CompanySectorSchema = SchemaFactory.createForClass(CompanySector);
