import { Injectable } from '@nestjs/common';
import { CreateJobInput } from './dto/create-job.input.js';
import { UpdateJobInput } from './dto/update-job.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job } from './entities/job.entity.js';
import { UpdateJobImageInput } from './dto/update-job-image.input.js';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private readonly jobModel: Model<Job>) {}

  public async create(createJobInput: CreateJobInput): Promise<Job> {
    return (await this.jobModel.create(createJobInput)).toObject();
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
