import { Test, TestingModule } from '@nestjs/testing';
import { CompanySectorService } from './company-sector.service.js';

describe('CompanySectorService', () => {
  let service: CompanySectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySectorService],
    }).compile();

    service = module.get<CompanySectorService>(CompanySectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
