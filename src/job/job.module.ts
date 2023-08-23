import { Module } from '@nestjs/common';
import { JobService } from './job.service.js';
import { JobResolver } from './job.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity.js';
import { BranchModule } from '../branch/branch.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    BranchModule,
  ],
  providers: [JobResolver, JobService],
})
export class JobModule {}
