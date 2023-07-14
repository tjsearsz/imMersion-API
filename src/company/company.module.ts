import { Module } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { CompanyResolver } from './company.resolver.js';
import { BranchModule } from 'src/branch/branch.module.js';

@Module({
  imports: [BranchModule],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
