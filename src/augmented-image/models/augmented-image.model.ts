import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AugmentedImage {
  @Field()
  modelURL: string;

  @Field()
  imageURL: string;
}
