import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AugmentedImageService } from './augmented-image.service.js';
import { AugmentedImage2 } from './entities/augmented-image.entity.js';

@Resolver()
export class AugmentedImageResolver {
  constructor(private readonly augmentedImageService: AugmentedImageService) {}

  @Query(() => [AugmentedImage2])
  public async getAllAugmentedImages() {
    return this.augmentedImageService.getAllImages();
  }

  /*@Query(() => AugmentedImage, {
    name: 'jobAugmentedImage',
    description: 'Gets the AugmentedImage of a job',
  })
  public async getAugmentedImageOfJob(): Promise<AugmentedImage | null> {}*/
}
