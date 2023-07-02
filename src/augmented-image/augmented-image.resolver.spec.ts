import { Test, TestingModule } from '@nestjs/testing';
import { AugmentedImageResolver } from './augmented-image.resolver';

describe('AugmentedImageResolver', () => {
  let resolver: AugmentedImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AugmentedImageResolver],
    }).compile();

    resolver = module.get<AugmentedImageResolver>(AugmentedImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
