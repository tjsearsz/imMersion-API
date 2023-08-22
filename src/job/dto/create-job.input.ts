import { InputType, Field } from '@nestjs/graphql';
import { AugmentedImageInput } from './augmented-image.input.js';
import { IsMongoId, IsUrl, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateJobInput {
  @Field({ description: 'Title of the new Job' })
  name: string;

  @Field({ description: 'Complete description of the new Job' })
  description: string;

  @ValidateNested()
  @Type(() => AugmentedImageInput)
  @Field(() => AugmentedImageInput, {
    description: 'Augmented Image for this Job',
  })
  augmentedImage: AugmentedImageInput;

  @IsMongoId()
  @Field({ description: 'Branch where this Job will be executed' })
  branchId: string;
}
