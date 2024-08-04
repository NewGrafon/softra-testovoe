import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDictionaryInput {
  @Field({ nullable: false, description: 'Name' })
  name: string;

  // @Field(() => [RecordEntity], { nullable: true, description: 'Records' })
  // records?: RecordEntity[];
}
