import { Module } from '@nestjs/common';
import { BranchService } from './branch.service.js';
import { BranchResolver } from './branch.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from './entities/branch.entity.js';
import { CompanyModule } from '../company/company.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
    CompanyModule,
  ],
  providers: [BranchResolver, BranchService],
  exports: [BranchService],
})
export class BranchModule {}
