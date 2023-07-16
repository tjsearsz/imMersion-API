import { IsMongoId } from 'class-validator';
import { CreateBranchInput } from './create-branch.input.js';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBranchInput extends CreateBranchInput {
  @IsMongoId()
  @Field({ description: 'ID of the branch' })
  id: string;

  @Field({
    description: 'Enables/disables the Branch',
  })
  isEnabled: boolean;
}
