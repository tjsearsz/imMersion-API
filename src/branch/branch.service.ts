import { Injectable } from '@nestjs/common';
import { CreateBranchInput } from './dto/create-branch.input.js';
import { UpdateBranchInput } from './dto/update-branch.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Branch } from './entities/branch.entity.js';
import { Model, Types } from 'mongoose';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
  ) {}

  public async create(createBranchInput: CreateBranchInput): Promise<Branch> {
    return (await this.branchModel.create(createBranchInput)).toObject();
  }

  public async findByUserId(userId: Types.ObjectId): Promise<Branch[]> {
    return this.branchModel.find({ ancestors: userId }).lean().exec();
  }

  findAll() {
    return `This action returns all branch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  public async update(
    id: string,
    updateBranchInput: Omit<UpdateBranchInput, 'id'>,
  ): Promise<Branch | null> {
    return this.branchModel
      .findByIdAndUpdate(id, updateBranchInput)
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
