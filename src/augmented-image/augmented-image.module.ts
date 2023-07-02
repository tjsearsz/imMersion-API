import { Module } from '@nestjs/common';
import { AugmentedImageResolver } from './augmented-image.resolver.js';
import { AugmentedImageService } from './augmented-image.service.js';

@Module({
  providers: [AugmentedImageResolver, AugmentedImageService],
})
export class AugmentedImageModule {}
