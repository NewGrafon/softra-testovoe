import { Module } from '@nestjs/common';
import { DictionariesService } from './dictionaries.service';
import { DictionariesResolver } from './dictionaries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from './entities/dictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  providers: [DictionariesResolver, DictionariesService],
})
export class DictionariesModule {}
