import { InputType, Field, Float } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateBranchInput {
  @Field(() => [Float], { description: 'Address of this Branch Long/Lat' })
  address: number[];

  @IsMongoId()
  @Field({ description: 'Company where this branch belongs to' })
  companyId: string;
}
