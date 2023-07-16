import { InputType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from '../../user/dto/create-user.input.js';

@InputType({ description: 'Input for doing authentication' })
export class LoginUserInput extends PickType(CreateUserInput, [
  'email',
  'password',
]) {}
