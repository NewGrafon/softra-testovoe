import { InputType, Field, Int } from '@nestjs/graphql';
import { DictionaryEntity } from '../../dictionaries/entities/dictionary.entity';

@InputType()
export class CreateRecordInput {
  @Field({ description: 'Name' })
  name: string;

  @Field({ description: 'Value' })
  value: string;

  @Field({ description: 'Color' })
  color: string;

  dictionary?: Partial<DictionaryEntity>;

  @Field(() => Int, { description: 'Dictionary ID' })
  dictionaryId: number;
}
