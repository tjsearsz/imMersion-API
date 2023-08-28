import { Field, InputType } from '@nestjs/graphql';
import { IsUrl, IsOptional } from 'class-validator';

@InputType()
export class AugmentedImageInput {
  @IsUrl()
  @Field({ description: 'URL where the image of the new model is located' })
  imageURL: string;

  @IsOptional()
  @IsUrl()
  @Field({
    description: 'URL where the user can click to get redirected to',
    nullable: true,
  })
  redirectURL?: string;
}
