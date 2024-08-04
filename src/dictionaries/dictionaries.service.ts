import { Injectable } from '@nestjs/common';
import { CreateDictionaryInput } from './dto/create-dictionary.input';
import { UpdateDictionaryInput } from './dto/update-dictionary.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DictionaryEntity } from './entities/dictionary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DictionariesService {
  constructor(
    @InjectRepository(DictionaryEntity)
    private readonly dictionaryRepository: Repository<DictionaryEntity>,
  ) {}

  async create(
    createDictionaryInput: CreateDictionaryInput,
  ): Promise<DictionaryEntity> {
    const newDictionary = await this.dictionaryRepository.save(
      createDictionaryInput,
    );

    return this.findOne(newDictionary.id);
  }

  async findAll(): Promise<DictionaryEntity[]> {
    const allDictionaries = await this.dictionaryRepository.find({
      relations: {
        records: true,
      },
    });

    return allDictionaries;
  }

  async findOne(id: number): Promise<DictionaryEntity> {
    const dictionary = await this.dictionaryRepository.findOne({
      relations: {
        records: true,
      },
      where: { id },
    });
    return dictionary;
  }

  async update(
    id: number,
    updateDictionaryInput: UpdateDictionaryInput,
  ): Promise<DictionaryEntity> {
    const exists = await this.findOne(id);
    if (!exists) {
      return null;
    }

    const updatedDictionary = await this.dictionaryRepository.save(
      updateDictionaryInput,
    );

    return updatedDictionary;
  }

  async remove(id: number): Promise<number> {
    const deletedDictionary = await this.dictionaryRepository.delete({ id });

    return deletedDictionary?.affected;
  }
}
