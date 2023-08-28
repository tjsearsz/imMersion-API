import { Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input.js';
import { UpdateCompanyInput } from './dto/update-company.input.js';
import { Company } from './entities/company.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CompanySectorService } from '../company-sector/company-sector.service.js';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    private readonly companySectorService: CompanySectorService,
  ) {}

  public async create(
    userId: Types.ObjectId,
    createCompanyInput: CreateCompanyInput,
  ): Promise<Company> {
    await this.companySectorService.validateCompanySectorExists(
      createCompanyInput.companySector,
    );

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
    await this.companySectorService.validateCompanySectorExists(
      updateCompanyInput.companySector,
    );

    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyInput)
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
