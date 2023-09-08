import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class AugmentedImageInput {
  @IsUrl()
  @Field({ description: 'URL where the image of the new model is located' })
  imageURL: string;
}
