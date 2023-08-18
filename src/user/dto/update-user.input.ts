import { IsMongoId } from 'class-validator';
import { CreateUserInput } from './create-user.input.js';
import { InputType, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, [
  'password',
  'isBusinessOwner',
]) {
  @Field({
    description: 'Flag to determine whether user is a Business owner or not',
  })
  isBusinessOwner: boolean;
}
