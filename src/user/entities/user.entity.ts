import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class User {
  _id: Types.ObjectId;

  /*@Prop({ required: true })
  @Field({ description: 'First Name of the user' })
  firstName: string;

  @Prop({ required: true })
  @Field({ description: 'Last name of the user' })
  lastName: string;*/

  @Prop({ required: true, index: true, unique: true })
  @Field({ description: 'Email of the user' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  @Field({
    description: 'Flag to determine whether user is a Business owner or not',
  })
  isBusinessOwner: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
