import { Company } from '../entities/company.entity.js';
import { Model, Types } from 'mongoose';
import ICompanyQuery from './ICompanyQuery.js';

export class FindByUserId implements ICompanyQuery<string, Company[]> {
  async execute(model: Model<Company>, userId: string): Promise<Company[]> {
    return model
      .find({ user: new Types.ObjectId(userId) })
      .lean()
      .exec();
  }
}
