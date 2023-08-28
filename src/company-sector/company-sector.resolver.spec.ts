import { Test, TestingModule } from '@nestjs/testing';
import { CompanySectorResolver } from './company-sector.resolver.js';

describe('CompanySectorResolver', () => {
  let resolver: CompanySectorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySectorResolver],
    }).compile();

    resolver = module.get<CompanySectorResolver>(CompanySectorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
