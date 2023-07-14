import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AugmentedImage {
  @Field({
    description: 'URL location for the Model to be rendered for this Image',
  })
  modelURL: string;

  @Field({
    description:
      'URL location for the image that will be scanned by the device',
  })
  imageURL: string;
}
