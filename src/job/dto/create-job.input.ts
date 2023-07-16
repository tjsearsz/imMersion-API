import { InputType, Field } from '@nestjs/graphql';
import { AugmentedImageInput } from './augmented-image.input.js';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateJobInput {
  @Field({ description: 'Title of the new Job' })
  name: string;

  @Field({ description: 'Complete description of the new Job' })
  description: string;

  @Field({ description: 'URL to redirect if available', nullable: true })
  redirectURL?: string;

  @Field({
    description: 'New jobs will always be disabled by default',
    defaultValue: false,
  })
  isEnabled: boolean;

  @Field(() => AugmentedImageInput, {
    description: 'Augmented Image for this Job',
  })
  augmentedImage: AugmentedImageInput;

  @IsMongoId()
  @Field({ description: 'Branch where this Job will be executed' })
  branchId: string;
}
