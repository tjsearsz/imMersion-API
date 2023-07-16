import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AugmentedImageResolver } from './augmented-image.resolver.js';
import { AugmentedImageService } from './augmented-image.service.js';
import {
  AugmentedImage2,
  AugmentedImageSchema,
} from './entities/augmented-image.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AugmentedImage2.name, schema: AugmentedImageSchema },
    ]),
  ],
  providers: [AugmentedImageResolver, AugmentedImageService],
})
export class AugmentedImageModule {}
