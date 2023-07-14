import { Module } from '@nestjs/common';
import { JobService } from './job.service.js';
import { JobResolver } from './job.resolver.js';
import { AugmentedImageModule } from 'src/augmented-image/augmented-image.module.js';

@Module({
  imports: [AugmentedImageModule],
  providers: [JobResolver, JobService],
})
export class JobModule {}
