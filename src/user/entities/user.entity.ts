import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Prop({ required: true })
  @Field({ description: 'First Name of the user' })
  firstName: string;

  @Prop({ required: true })
  @Field({ description: 'Last name of the user' })
  lastName: string;

  @Prop({ required: true })
  @Field({ description: 'Email of the user' })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
