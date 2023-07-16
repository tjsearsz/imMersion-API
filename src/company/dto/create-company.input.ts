import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field({ description: 'Name of the new company' })
  name: string;

  @Field({
    description: 'Brief information about the new company',
    nullable: true,
  })
  description?: string;
}
