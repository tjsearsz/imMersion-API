import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyService } from './company.service.js';
import { Company } from './entities/company.entity.js';
import { CreateCompanyInput } from './dto/create-company.input.js';
import { UpdateCompanyInput } from './dto/update-company.input.js';
import { CurrentUser } from '../decorators/currentUser.js';
import { IUserSummary } from 'src/auth/interfaces/IUserSummary.js';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
    @CurrentUser() user: IUserSummary,
  ): Promise<Company> {
    return this.companyService.create(user.userId, {
      ...createCompanyInput,
    });
  }

  /*@Query(() => [Company], { name: 'company' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyService.findOne(id);
  }*/

  @Query(() => [Company], {
    name: 'userCompanies',
    description: 'Find all companies that belong to the user',
  })
  public async findCompaniesByUserId(
    @Args('id') userId: string,
  ): Promise<Company[]> {
    return this.companyService.findByUserId(userId);
  }

  @Mutation(() => Company)
  public async updateCompany(
    @Args('updateCompanyInput')
    { id, ...updateCompanyPayload }: UpdateCompanyInput,
  ) {
    return this.companyService.update(id, updateCompanyPayload);
  }

  @Mutation(() => Company)
  removeCompany(@Args('id', { type: () => Int }) id: number) {
    return this.companyService.remove(id);
  }
}
