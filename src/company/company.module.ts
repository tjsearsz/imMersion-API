import { Module } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { CompanyResolver } from './company.resolver.js';
import { BranchModule } from '../branch/branch.module.js';
import { Company, CompanySchema } from './entities/company.entity.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BranchModule,
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
