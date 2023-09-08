import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Types } from 'mongoose';

import { EOwnership } from '../../enums/EOwnership.js';
import IOwnership from '../../interfaces/IOwnership.js';

@Schema({ timestamps: true })
@ObjectType()
export class Job implements IOwnership {
  @Field(() => ID, { description: 'ID of the Job' })
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field({ description: 'Title of the job' })
  name: string;

  @Prop({ required: true })
  @Field({ description: 'Complete description of the job' })
  description: string;

  @Prop({ required: true, default: true })
  @Field({ description: 'Determines whether the job is active or not' })
  isEnabled: boolean;

  @Prop({
    type: [
      {
        type: mongooseSchema.Types.ObjectId,
        required: true,
      },
    ],
    required: true,
    validate: (array: Types.ObjectId[]) => array.length > 0,
  })
  ancestors: Types.ObjectId[];

  @Field(() => String, {
    description: 'Branch where this job belongs',
  })
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: EOwnership.Branch,
    required: true,
  })
  immediateAncestor: Types.ObjectId;

  @Prop()
  @Field({
    description: 'Redirect page when checking the information of the job',
    nullable: true,
  })
  redirectURL?: string; //TODO: REPLACE THIS WITH URL type

  @Prop()
  @Field(() => Int, { description: 'number of open positions available' })
  positions: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
