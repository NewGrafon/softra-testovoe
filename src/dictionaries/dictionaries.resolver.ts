import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DictionariesService } from './dictionaries.service';
import { DictionaryEntity } from './entities/dictionary.entity';
import { CreateDictionaryInput } from './dto/create-dictionary.input';
import { UpdateDictionaryInput } from './dto/update-dictionary.input';

@Resolver(() => DictionaryEntity)
export class DictionariesResolver {
  constructor(private readonly dictionariesService: DictionariesService) {}

  @Mutation(() => DictionaryEntity)
  createDictionary(
    @Args('createDictionaryInput') createDictionaryInput: CreateDictionaryInput,
  ) {
    return this.dictionariesService.create(createDictionaryInput);
  }

  @Query(() => [DictionaryEntity], { name: 'dictionaries' })
  findAll() {
    return this.dictionariesService.findAll();
  }

  @Query(() => DictionaryEntity, { name: 'dictionary' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dictionariesService.findOne(id);
  }

  @Mutation(() => DictionaryEntity)
  updateDictionary(
    @Args('updateDictionaryInput') updateDictionaryInput: UpdateDictionaryInput,
  ) {
    return this.dictionariesService.update(
      updateDictionaryInput.id,
      updateDictionaryInput,
    );
  }

  @Mutation(() => Int)
  removeDictionary(@Args('id', { type: () => Int }) id: number) {
    return this.dictionariesService.remove(id);
  }
}
