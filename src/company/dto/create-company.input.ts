import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field({ description: 'Name of the new company' })
  name: string;

  @Field({
    description: 'Brief information about the new company',
    nullable: true,
  })
  description?: string;

  @IsMongoId()
  @Field({
    description: 'ID of the sector for this company',
  })
  companySector: string;
}
