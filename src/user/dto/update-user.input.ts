import { IsMongoId } from 'class-validator';
import { CreateUserInput } from './create-user.input.js';
import { InputType, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['password']) {
  @IsMongoId()
  @Field({ description: 'ID of the user' })
  id: string;
}
