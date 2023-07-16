import { Module } from '@nestjs/common';
import { BranchService } from './branch.service.js';
import { BranchResolver } from './branch.resolver.js';
import { JobModule } from '../job/job.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Branch, BranchSchema } from './entities/branch.entity.js';

@Module({
  imports: [
    JobModule,
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
  ],
  providers: [BranchResolver, BranchService],
})
export class BranchModule {}
