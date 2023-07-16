import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { LoginUserInput } from './dto/login-user.input.js';
import { User } from '../user/entities/user.entity.js';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard.js';
import { CurrentUser } from '../decorators/currentUser.js';
import { CreateUserInput } from '../user/dto/create-user.input.js';
import { LoginPayload } from './dto/login-payload.js';
import { skipGqlAuth } from '../decorators/skipGqlAuth.js';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @skipGqlAuth()
  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginPayload)
  public async login(
    @Args('loginUserInput') _: LoginUserInput,
    @CurrentUser() user: User,
  ): Promise<LoginPayload> {
    return this.authService.login(user);
  }

  @skipGqlAuth() //We have enabled JWT as default in all the app, so we have to disable it for this mutation
  @Mutation(() => User)
  public async signIn(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.authService.signIn(createUserInput);
  }
}
