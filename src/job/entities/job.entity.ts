import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Types } from 'mongoose';

import {
  AugmentedImage,
  AugmentedImageSchema,
} from './augmented-image.entity.js';
import { User } from '../../user/entities/user.entity.js';
import { EOwnership } from '../../enums/EOwnership.js';
import IOwnership from '../../interfaces/IOwnership.js';

@Schema({ timestamps: true })
@ObjectType()
export class Job implements IOwnership {
  @Prop({ required: true })
  @Field({ description: 'Title of the job' })
  name: string;

  @Prop({ required: true })
  @Field({ description: 'Complete description of the job' })
  description: string;

  @Prop()
  @Field({ description: 'URL to redirect if available', nullable: true })
  redirectionURL?: string;

  @Prop({ required: true })
  @Field({ description: 'Determines whether the job is active or not' })
  isEnabled: boolean;

  @Prop({
    type: AugmentedImageSchema,
    required: true,
  })
  @Field(() => AugmentedImage)
  augmentedImage: AugmentedImage;

  @Prop({
    type: [
      {
        type: mongooseSchema.Types.ObjectId,
        refPath: 'ancestorModel',
        required: true,
      },
    ],
    required: true,
    validate: (array: Types.ObjectId[]) => array.length > 0,
  })
  ancestors: Types.ObjectId[];

  @Prop({
    required: true,
    enum: [User.name, EOwnership.Company, EOwnership.Branch],
  })
  ancestorModel: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: EOwnership.Branch,
    required: true,
  })
  immediateAncestor: Types.ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);
