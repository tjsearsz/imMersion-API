import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BranchService } from './branch.service.js';
import { Branch } from './entities/branch.entity.js';
import { CreateBranchInput } from './dto/create-branch.input.js';
import { UpdateBranchInput } from './dto/update-branch.input.js';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @Mutation(() => Branch)
  createBranch(
    @Args('createBranchInput') createBranchInput: CreateBranchInput,
  ): Promise<Branch> {
    return this.branchService.create(createBranchInput);
  }

  @Query(() => [Branch], { name: 'branch' })
  findAll() {
    return this.branchService.findAll();
  }

  @Query(() => Branch, { name: 'branch' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.findOne(id);
  }

  @Mutation(() => Branch)
  updateBranch(
    @Args('updateBranchInput')
    { id, ...updateBranchPayload }: UpdateBranchInput,
  ) {
    return this.branchService.update(id, updateBranchPayload);
  }

  @Mutation(() => Branch)
  removeBranch(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.remove(id);
  }
}
