import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  /*@Field({ description: 'First name of the new user' })
  firstName: string;

  @Field({ description: 'Last name of the user' })
  lastName: string;*/

  @IsEmail()
  @Field({ description: 'Email address of the new user' })
  email: string;

  @Field({ description: 'Password of the new User' })
  password: string;

  @Field({
    description: 'Flag to determine whether user is a Business owner or not',
    defaultValue: false,
  })
  isBusinessOwner: boolean;
}
