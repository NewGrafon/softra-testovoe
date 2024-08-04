import { CreateDictionaryInput } from './create-dictionary.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDictionaryInput extends PartialType(CreateDictionaryInput) {
  @Field(() => ID, { nullable: false, description: 'Name' })
  id: number;

  @Field({ nullable: true, description: 'Name' })
  name?: string;

  // @Field(() => [RecordEntity], { nullable: true, description: 'Records' })
  // records?: RecordEntity[];
}
