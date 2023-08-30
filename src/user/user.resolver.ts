import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { User } from './entities/user.entity.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { UpdateUserInput } from './dto/update-user.input.js';
import { CurrentUser } from '../decorators/currentUser.js';
import { IUserSummary } from '../auth/interfaces/IUserSummary.js';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    // return this.userService.findOne(id);
    return true;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserPayload: UpdateUserInput) {
    return this.userService.update(updateUserPayload);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Mutation(() => Boolean)
  public async changeUserBusinessOwnerStatus(
    @Args('isBusinessOwner') isBusinessOwner: boolean,
    @CurrentUser() user: IUserSummary,
  ): Promise<boolean> {
    return this.userService.changeBusinessOwnerStatus(
      user.userId,
      isBusinessOwner,
    );
  }
}
