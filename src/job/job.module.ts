import { Module } from '@nestjs/common';
import { JobService } from './job.service.js';
import { JobResolver } from './job.resolver.js';
import { AugmentedImageModule } from '../augmented-image/augmented-image.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity.js';

@Module({
  imports: [
    AugmentedImageModule,
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  ],
  providers: [JobResolver, JobService],
})
export class JobModule {}
