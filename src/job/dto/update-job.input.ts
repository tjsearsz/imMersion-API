import { IsMongoId } from 'class-validator';
import { CreateJobInput } from './create-job.input.js';
import { InputType, Field, OmitType } from '@nestjs/graphql';
// import { PickTypesWrapper } from '../../common/graphql-mapped-types.js';

@InputType()
export class UpdateJobInput extends OmitType(CreateJobInput, ['branchId']) {
  @IsMongoId()
  @Field({ description: 'ID of the Job' })
  id: string;

  @Field({
    description: 'Enables/disables the Job',
  })
  isEnabled: boolean;
}
