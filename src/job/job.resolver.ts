import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobService } from './job.service.js';
import { Job } from './entities/job.entity.js';
import { AugmentedImage } from './entities/augmented-image.entity.js';
import { CreateJobInput } from './dto/create-job.input.js';
import { UpdateJobInput } from './dto/update-job.input.js';
import { UpdateJobImageInput } from './dto/update-job-image.input.js';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => Job)
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.jobService.create(createJobInput);
  }

  @Mutation(() => AugmentedImage, {
    name: 'updateAugmentedImage',
  })
  public async updateAugmentedImageJob(
    @Args('augmentedImageInput', {
      description: 'AugmentedImage to be updated in a job',
    })
    augementedImageInput: UpdateJobImageInput,
  ): Promise<Job> {
    return this.jobService.updateAugmentedImage(augementedImageInput);
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
  ): Promise<Job | null> {
    //TODO: CHECK THIS ERROR INSTEAD OF NULL
    const { id, ...updateJobPayload } = updateJobInput;
    return this.jobService.update(id, updateJobPayload);
  }

  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.remove(id);
  }
}
