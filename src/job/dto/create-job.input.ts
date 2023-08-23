import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateJobInput {
  @Field({ description: 'Title of the new Job' })
  name: string;

  @Field({ description: 'Complete description of the new Job' })
  description: string;

  @IsMongoId()
  @Field({ description: 'Branch where this Job will be executed' })
  branchId: string;
}
