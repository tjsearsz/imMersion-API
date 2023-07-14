import { Module } from '@nestjs/common';
import { BranchService } from './branch.service.js';
import { BranchResolver } from './branch.resolver.js';
import { JobModule } from 'src/job/job.module.js';

@Module({
  imports: [JobModule],
  providers: [BranchResolver, BranchService],
})
export class BranchModule {}
