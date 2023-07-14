import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Branch {
  @Field({ description: 'Address of the branch' })
  address: string;

  @Field({
    description: 'Determine whether this branch is still available or not',
  })
  enabled: boolean;
}
