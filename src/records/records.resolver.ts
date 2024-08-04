import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecordsService } from './records.service';
import { RecordEntity } from './entities/record.entity';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';

@Resolver(() => RecordEntity)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @Mutation(() => RecordEntity)
  createRecord(
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
  ) {
    return this.recordsService.create(createRecordInput);
  }

  @Query(() => [RecordEntity], { name: 'records' })
  findAll() {
    return this.recordsService.findAll();
  }

  @Query(() => RecordEntity, { name: 'record' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recordsService.findOne(id);
  }

  @Mutation(() => RecordEntity)
  updateRecord(
    @Args('updateRecordInput') updateRecordInput: UpdateRecordInput,
  ) {
    return this.recordsService.update(updateRecordInput.id, updateRecordInput);
  }

  @Mutation(() => Int)
  removeRecord(@Args('id', { type: () => Int }) id: number) {
    return this.recordsService.remove(id);
  }
}
