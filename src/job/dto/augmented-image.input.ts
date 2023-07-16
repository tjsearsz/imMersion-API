import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AugmentedImageInput {
  @Field({ description: 'URL for the model we want to create' })
  modelURL: string;

  @Field({ description: 'URL where the image of the new model is located' })
  imageURL: string;

  @Field({
    description: 'URL where the user can click to get redirected to',
    nullable: true,
  })
  redirectURL?: string;
}
