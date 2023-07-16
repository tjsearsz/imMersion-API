import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity.js';

@ObjectType({
  description: 'The response when doing login that includes the access_token',
})
export class LoginPayload {
  @Field({ description: 'The JWT accesst token' })
  accessToken: string;

  @Field(() => User, { description: 'The user entity' })
  user: User;
}
