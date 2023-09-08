import { InputType, Field, Int } from '@nestjs/graphql';
import { IsMongoId, IsUrl, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreateJobInput {
  @Field({ description: 'Title of the new Job' })
  name: string;

  @Field({ description: 'Complete description of the new Job' })
  description: string;

  @IsMongoId()
  @Field({ description: 'Branch where this Job will be executed' })
  branchId: string;

  @IsOptional()
  @IsUrl()
  @Field({
    description: 'URL where the user can click to get redirected to',
    nullable: true,
  })
  redirectURL?: string;

  @IsPositive()
  @Field(() => Int, {
    description: 'number of available positions for this job',
  })
  positions: number;
}
