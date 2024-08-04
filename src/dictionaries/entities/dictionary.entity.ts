import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RecordEntity } from '../../records/entities/record.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType('Dictionary')
@InputType('DictionaryInput')
@Entity('dictionaries')
export class DictionaryEntity {
  @Field(() => Int, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Name' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field(() => [RecordEntity], { description: 'Records' })
  @OneToMany(() => RecordEntity, (record) => record.dictionary, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  records: RecordEntity[];

  // @RelationId((dictionary: DictionaryEntity) => dictionary.records)
  // recordsIds: number[];

  @Field(() => Date, { description: 'Created at' })
  @CreateDateColumn()
  createdAt: Date;
}
