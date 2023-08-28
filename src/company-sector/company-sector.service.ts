import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CompanySector } from './entities/company-sector.js';
import { CreateCompanySectorInput } from './interfaces/create-company-sector.input.js';

@Injectable()
export class CompanySectorService {
  constructor(
    @InjectModel(CompanySector.name)
    private readonly companySectorModel: Model<CompanySector>,
  ) {}

  public async findAll(): Promise<CompanySector[]> {
    return this.companySectorModel.find({}).lean().exec();
  }

  public async findById(
    companySectorId: string | Types.ObjectId,
  ): Promise<CompanySector | null> {
    return this.companySectorModel.findById(companySectorId).lean().exec();
  }

  public async validateCompanySectorExists(
    companySectorId: string,
  ): Promise<void> {
    const companySector = await this.companySectorModel.findById(
      companySectorId,
    );

    if (!companySector)
      throw new Error('the given company sector does not exist');
  }

  public async create(
    newCompanySector: CreateCompanySectorInput,
  ): Promise<CompanySector> {
    return (await this.companySectorModel.create(newCompanySector)).toObject();
  }
}
