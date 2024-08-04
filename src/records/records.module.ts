import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsResolver } from './records.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  providers: [RecordsResolver, RecordsService],
})
export class RecordsModule {}
