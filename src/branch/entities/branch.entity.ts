import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Types } from 'mongoose';
import { EOwnership } from '../../enums/EOwnership.js';
import IOwnership from '../../interfaces/IOwnership.js';
import { User } from '../../user/entities/user.entity.js';
import { Point, PointSchema } from './point.entity.js';

export type BranchGQL = Omit<Branch, 'address'> & { address: number[] };

@Schema({ timestamps: true })
@ObjectType()
export class Branch implements IOwnership {
  @Field(() => ID, { description: 'ID of the company' })
  _id: Types.ObjectId;

  @Prop({
    type: PointSchema,
    required: true,
    index: '2dsphere',
  })
  @Field(() => [Float], { description: 'Address of the branch' })
  address: Point;

  @Prop({ required: true, default: false })
  @Field({
    description: 'Determines whether this branch is still available or not',
  })
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
    description: 'Company where this branch belongs',
  })
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: EOwnership.Company,
    required: true,
  })
  immediateAncestor: Types.ObjectId;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
