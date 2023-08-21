import { Company } from '../entities/company.entity.js';
import { Model, Types } from 'mongoose';
import ICompanyQuery from './ICompanyQuery.js';
import { CreateCompanyInput } from '../dto/create-company.input.js';

export class CreateCompany
  implements
    ICompanyQuery<
      { userId: Types.ObjectId; createCompanyInput: CreateCompanyInput },
      Company
    >
{
  async execute(
    model: Model<Company>,
    {
      userId,
      createCompanyInput,
    }: {
      userId: Types.ObjectId;
      createCompanyInput: CreateCompanyInput;
    },
  ): Promise<Company> {
    return (await model.create({ userId, ...createCompanyInput })).toObject();
  }
}
