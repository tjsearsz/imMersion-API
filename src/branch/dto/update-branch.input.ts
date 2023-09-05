import { IsMongoId } from 'class-validator';
import { CreateBranchInput } from './create-branch.input.js';
import { InputType, Field, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateBranchInput extends PickType(CreateBranchInput, [
  'address',
  'fullAddress',
]) {
  @IsMongoId()
  @Field({ description: 'ID of the branch' })
  id: string;

  @Field({
    description: 'Enables/disables the Branch',
  })
  isEnabled: boolean;
}
