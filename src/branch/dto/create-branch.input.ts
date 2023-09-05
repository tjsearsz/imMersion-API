import { InputType, Field, Float } from '@nestjs/graphql';
import { IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AugmentedImageInput } from './augmented-image.input.js';

@InputType()
export class CreateBranchInput {
  @Field(() => [Float], { description: 'Address of this Branch Long/Lat' })
  address: number[];

  @Field({ description: 'The full address in text of the user' })
  fullAddress: string;

  @IsMongoId()
  @Field({ description: 'Company where this branch belongs to' })
  companyId: string;

  @ValidateNested()
  @Type(() => AugmentedImageInput)
  @Field(() => AugmentedImageInput, {
    description: 'Augmented Image for this Job',
  })
  augmentedImage: AugmentedImageInput;
}
