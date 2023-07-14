import { Resolver, Query } from '@nestjs/graphql';

import { AugmentedImageService } from './augmented-image.service.js';
import { AugmentedImage } from './entities/augmented-image.entity.js';

@Resolver()
export class AugmentedImageResolver {
  constructor(private readonly augmentedImageService: AugmentedImageService) {}

  @Query(() => [AugmentedImage])
  public async getAllAugmentedImages() {
    return this.augmentedImageService.getAllImages();
  }
}
