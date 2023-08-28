import { Module } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { CompanyResolver } from './company.resolver.js';
import { Company, CompanySchema } from './entities/company.entity.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySectorModule } from '../company-sector/company-sector.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    CompanySectorModule,
  ],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
