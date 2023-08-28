import { Resolver, Query } from '@nestjs/graphql';
import { CompanySectorService } from './company-sector.service.js';
import { CompanySector } from './entities/company-sector.js';

@Resolver(() => CompanySector)
export class CompanySectorResolver {
  constructor(private readonly companySectorService: CompanySectorService) {}

  @Query(() => [CompanySector], {
    description: 'Gets all the company sectors available',
    name: 'CompanySectors',
  })
  public async getAllCompanySectors(): Promise<CompanySector[]> {
    return this.companySectorService.findAll();
  }
}
