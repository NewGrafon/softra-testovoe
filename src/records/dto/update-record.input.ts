import { CreateRecordInput } from './create-record.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { DictionaryEntity } from '../../dictionaries/entities/dictionary.entity';

@InputType()
export class UpdateRecordInput extends PartialType(CreateRecordInput) {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ nullable: true, description: 'Name' })
  name?: string;

  @Field({ nullable: true, description: 'Value' })
  value?: string;

  @Field({ nullable: true, description: 'Color' })
  color?: string;

  @Field(() => Int, { nullable: true, description: 'Dictionary ID' })
  dictionaryId: number;
}
