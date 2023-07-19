import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobService } from './job.service.js';
import { Job } from './entities/job.entity.js';
// import { AugmentedImage } from './entities/augmented-image.entity.js';
import { CreateJobInput } from './dto/create-job.input.js';
import { UpdateJobInput } from './dto/update-job.input.js';
import { UpdateJobImageInput } from './dto/update-job-image.input.js';
import { CurrentUser } from '../decorators/currentUser.js';
import { IUserSummary } from '../auth/interfaces/IUserSummary.js';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => Job)
  async createJob(
    @Args('createJobInput') createJobInput: CreateJobInput,
    @CurrentUser() user: IUserSummary,
  ): Promise<Job> {
    return this.jobService.create(user.userId, createJobInput);
  }

  @Mutation(() => Job, {
    name: 'updateAugmentedImage',
  })
  public async updateAugmentedImageJob(
    @Args('augmentedImageInput', {
      description: 'AugmentedImage to be updated in a job',
    })
    augementedImageInput: UpdateJobImageInput,
  ): Promise<Job> {
    const updatedJob = await this.jobService.updateAugmentedImage(
      augementedImageInput,
    );

    if (!updatedJob) {
      throw new Error('Job with that ID does not exist');
    }

    return updatedJob;
  }

  @Query(() => [Job], { name: 'job' })
  findAll() {
    return this.jobService.findAll();
  }

  @Query(() => Job, { name: 'job' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.findOne(id);
  }

  @Mutation(() => Job)
  public async updateJob(
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
  ): Promise<Job> {
    const { id, ...updateJobPayload } = updateJobInput;
    const updatedJob = await this.jobService.update(id, updateJobPayload);

    if (!updatedJob) {
      throw new Error('Job with that ID does not exist');
    }

    return updatedJob;
  }

  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.remove(id);
  }
}
