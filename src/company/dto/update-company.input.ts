import { CreateCompanyInput } from './create-company.input.js';
import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateCompanyInput extends CreateCompanyInput {
  @IsMongoId()
  @Field({ description: 'ID of the Company to update' })
  id: string;

  @Field({
    description: 'Enables/disables the company',
  })
  isEnabled: boolean;
}
