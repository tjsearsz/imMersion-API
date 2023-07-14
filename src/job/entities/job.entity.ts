import { ObjectType, Field } from '@nestjs/graphql';
import { AugmentedImage } from 'src/augmented-image/entities/augmented-image.entity.js';

@ObjectType()
export class Job {
  @Field({ description: 'Title of the job' })
  name: String;

  @Field({ description: 'Complete description of the job' })
  description: String;

  @Field({ description: 'URL to redirect if available', nullable: true })
  redirectionURL?: String;

  @Field(() => AugmentedImage)
  augmentedImage: AugmentedImage;
}
