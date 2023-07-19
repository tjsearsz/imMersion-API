import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateBranchInput {
  @Field({ description: 'Address of this Branch' })
  address: string;

  @IsMongoId()
  @Field({ description: 'Company where this branch belongs to' })
  companyId: string;
}
