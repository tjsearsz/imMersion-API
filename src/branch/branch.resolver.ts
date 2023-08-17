import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BranchService } from './branch.service.js';
import { Branch, BranchGQL } from './entities/branch.entity.js';
import { CreateBranchInput } from './dto/create-branch.input.js';
import { UpdateBranchInput } from './dto/update-branch.input.js';
import { CurrentUser } from '../decorators/currentUser.js';
import { IUserSummary } from '../auth/interfaces/IUserSummary.js';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @Mutation(() => Branch)
  async createBranch(
    @Args('createBranchInput') createBranchInput: CreateBranchInput,
    @CurrentUser() user: IUserSummary,
  ): Promise<BranchGQL> {
    const {
      address: { coordinates },
      ...rest
    } = await this.branchService.create(user.userId, createBranchInput);

    return {
      ...rest,
      address: coordinates,
    };
  }

  @Query(() => [Branch], { name: 'branch' })
  findAll() {
    return this.branchService.findAll();
  }

  /*@Query(() => Branch, { name: 'branch' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.findOne(id);
  }*/

  @Mutation(() => Branch)
  async updateBranch(
    @Args('updateBranchInput')
    { id, ...updateBranchPayload }: UpdateBranchInput,
  ): Promise<BranchGQL> {
    const updatedBranch = await this.branchService.update(
      id,
      updateBranchPayload,
    );

    //TODO: remove business logic from resolvers
    if (!updatedBranch) {
      throw Error('Branch with that ID does not exist'); //TODO: Improve errors
    }

    const { address, ...rest } = updatedBranch;

    return {
      ...rest,
      address: address.coordinates,
    };
  }

  @Mutation(() => Branch)
  removeBranch(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.remove(id);
  }
}
