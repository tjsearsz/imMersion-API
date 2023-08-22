import { Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input.js';
import { UpdateCompanyInput } from './dto/update-company.input.js';
import { Company } from './entities/company.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  public async create(
    userId: Types.ObjectId,
    createCompanyInput: CreateCompanyInput,
  ): Promise<Company> {
    return (
      await this.companyModel.create({ userId, ...createCompanyInput })
    ).toObject();
  }

  public async findByUserId(userId: Types.ObjectId): Promise<Company[]> {
    return this.companyModel.find({ userId: userId }).lean().exec();
  }

  findAll() {
    return `This action returns all company`;
  }

  public async findOne(
    companyId: string | Types.ObjectId,
  ): Promise<Company | null> {
    return this.companyModel.findById(companyId).lean().exec();
  }

  public async update(
    id: string,
    updateCompanyInput: Omit<UpdateCompanyInput, 'id'>,
  ): Promise<Company | null> {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyInput)
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
