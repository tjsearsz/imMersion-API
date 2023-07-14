import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field({ description: 'Name of the company' })
  name: string;

  @Field({ description: 'Brief information about the company', nullable: true })
  description?: string;
}
