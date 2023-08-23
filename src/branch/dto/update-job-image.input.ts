import { Field, InputType } from '@nestjs/graphql';
import { AugmentedImageInput } from './augmented-image.input.js';
import { IsMongoId } from 'class-validator';

@InputType({ description: 'Data for updating the Augmented Image of a job' })
export class UpdateJobImageInput extends AugmentedImageInput {
  @IsMongoId()
  @Field({ description: 'ID of the Job for this image' })
  jobId: string;
}
