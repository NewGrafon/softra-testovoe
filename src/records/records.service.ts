import { Injectable } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { RecordEntity } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}

  async create(createRecordInput: CreateRecordInput): Promise<RecordEntity> {
    if (createRecordInput.dictionaryId) {
      createRecordInput.dictionary = { id: createRecordInput.dictionaryId };
      delete createRecordInput.dictionaryId;
    }
    const newRecord = await this.recordRepository.save(createRecordInput);

    return this.findOne(newRecord.id);
  }

  async findAll(): Promise<RecordEntity[]> {
    const allRecords = await this.recordRepository.find({
      relations: {
        dictionary: true,
      },
    });

    return allRecords;
  }

  async findOne(id: number): Promise<RecordEntity> {
    const record = await this.recordRepository.findOne({
      relations: {
        dictionary: true,
      },
      where: { id },
    });

    return record;
  }

  async update(
    id: number,
    updateRecordInput: UpdateRecordInput,
  ): Promise<RecordEntity> {
    const exists = await this.findOne(id);
    if (!exists) {
      return null;
    }

    if (updateRecordInput.dictionaryId) {
      updateRecordInput.dictionary = { id: updateRecordInput.dictionaryId };
      delete updateRecordInput.dictionaryId;
    }

    const updatedRecord = await this.recordRepository.update(
      { id },
      updateRecordInput,
    );

    return this.findOne(updatedRecord?.raw[0]?.id);
  }

  async remove(id: number): Promise<number> {
    const deletedRecord = await this.recordRepository.delete({ id });

    return deletedRecord?.affected;
  }
}
