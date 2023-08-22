import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as mongooseSchema } from 'mongoose';
import IOwnership from '../../interfaces/IOwnership.js';

@Schema({ timestamps: true })
@ObjectType()
export class Company implements IOwnership {
  @Field(() => ID, { description: 'ID of the company' })
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field({ description: 'Name of the company' })
  name: string;

  @Prop()
  @Field({ description: 'Brief information about the company', nullable: true })
  description?: string;

  @Prop({ required: true, default: false })
  @Field({ description: 'Determines whether the company is active or not' })
  isEnabled: boolean;

  @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  /*@Prop({
    type: [
      {
        type: mongooseSchema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
    required: true,
    default: [],
  })
  ancestors: Types.ObjectId[];*/ //TODO: CHECK THIS
}

export const CompanySchema = SchemaFactory.createForClass(Company);
