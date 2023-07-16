import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBranchInput {
  @Field({ description: 'Example field (placeholder)' })
  address: string;
}
