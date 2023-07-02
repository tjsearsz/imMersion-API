import { Test, TestingModule } from '@nestjs/testing';
import { AugmentedImageService } from './augmented-image.service';

describe('AugmentedImageService', () => {
  let service: AugmentedImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AugmentedImageService],
    }).compile();

    service = module.get<AugmentedImageService>(AugmentedImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
