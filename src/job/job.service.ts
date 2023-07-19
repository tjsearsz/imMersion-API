import { Injectable } from '@nestjs/common';
import { CreateJobInput } from './dto/create-job.input.js';
import { UpdateJobInput } from './dto/update-job.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job } from './entities/job.entity.js';
import { UpdateJobImageInput } from './dto/update-job-image.input.js';
import { BranchService } from '../branch/branch.service.js';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
    private readonly branchService: BranchService,
  ) {}

  public async create(
    userId: Types.ObjectId,
    createJobInput: CreateJobInput,
  ): Promise<Job> {
    const { branchId, ...rest } = createJobInput;

    const branchFound = await this.branchService.findOne(branchId);

    if (!branchFound) {
      throw new Error('Branch does not exist');
    }
    return (
      await this.jobModel.create({
        ...rest,
        ancestors: [userId, branchFound._id, branchFound.immediateAncestor],
        immediateAncestor: branchFound._id,
      })
    ).toObject();
  }

  public async updateAugmentedImage({
    jobId,
    ...updateImagePayload
  }: UpdateJobImageInput): Promise<Job | null> {
    return this.jobModel
      .findByIdAndUpdate(
        jobId,
        { augmentedImage: updateImagePayload },
        { new: true },
      )
      .lean()
      .exec();
  }

  public async findByUserId(userId: Types.ObjectId): Promise<Job[]> {
    return this.jobModel.find({ ancestors: userId }).lean().exec();
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  public async update(
    id: string,
    updateJobInput: Omit<UpdateJobInput, 'id'>,
  ): Promise<Job | null> {
    return this.jobModel
      .findByIdAndUpdate(id, updateJobInput, { new: true })
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
