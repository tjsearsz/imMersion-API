import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Types } from 'mongoose';
import { EOwnership } from '../../enums/EOwnership.js';
import IOwnership from '../../interfaces/IOwnership.js';
import { User } from '../../user/entities/user.entity.js';

@Schema({ timestamps: true })
@ObjectType()
export class Branch implements IOwnership {
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field({ description: 'Address of the branch' })
  address: string; //TODO: IMPROVE THIS

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

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: EOwnership.Company,
    required: true,
  })
  immediateAncestor: Types.ObjectId;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
