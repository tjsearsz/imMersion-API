import { Injectable } from '@nestjs/common';
import { CreateBranchInput } from './dto/create-branch.input.js';
import { UpdateBranchInput } from './dto/update-branch.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Branch } from './entities/branch.entity.js';
import { Model, Types } from 'mongoose';
import { CompanyService } from '../company/company.service.js';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
    private readonly companyService: CompanyService,
  ) {}

  public async create(
    userId: Types.ObjectId,
    createBranchInput: CreateBranchInput,
  ): Promise<Branch> {
    const { companyId, address, ...rest } = createBranchInput;

    const companyFound = await this.companyService.findOne(companyId);

    if (!companyFound) {
      throw new Error('CompanyId does not exist');
    }

    return (
      await this.branchModel.create({
        ...rest,
        address: {
          coordinates: address,
        },
        ancestors: [userId, companyFound._id],
        immediateAncestor: companyFound._id,
      })
    ).toObject();
  }

  public async findByUserId(userId: Types.ObjectId): Promise<Branch[]> {
    return this.branchModel.find({ ancestors: userId }).lean().exec();
  }

  findAll() {
    return `This action returns all branch`;
  }

  findOne(branchId: string | Types.ObjectId): Promise<Branch | null> {
    return this.branchModel.findById(branchId).lean().exec();
  }

  public async update(
    id: string,
    updateBranchInput: Omit<UpdateBranchInput, 'id'>,
  ): Promise<Branch | null> {
    return this.branchModel
      .findByIdAndUpdate(id, updateBranchInput, { new: true })
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
