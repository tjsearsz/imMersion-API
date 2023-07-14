import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ description: 'Name of the user' })
  name: string;

  @Field({ description: 'Last name of the user' })
  lastname: string;

  @Field({ description: 'Email of the user' })
  email: string;

  password: string;
}
