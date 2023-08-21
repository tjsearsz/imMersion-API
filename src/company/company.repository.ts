import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Company } from './entities/company.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import * as queries from './queries/index.js';

@Injectable()
export default class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  /*public async executeQuery<Q extends keyof typeof queries>(
    queryName: Q,
    parameters: Parameters<
      InstanceType<(typeof queries)[typeof queryName]>['execute']
    >[1],
  ) {
    return new queries[queryName]().execute(
      this.companyModel,
      parameters as any,
    );
  }*/
}
