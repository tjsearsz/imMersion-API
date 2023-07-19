import { Module } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { CompanyResolver } from './company.resolver.js';
import { Company, CompanySchema } from './entities/company.entity.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
