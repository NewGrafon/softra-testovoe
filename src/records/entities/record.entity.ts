import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { DictionaryEntity } from '../../dictionaries/entities/dictionary.entity';
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@ObjectType('Record')
@InputType('RecordInput')
@Entity('records')
export class RecordEntity {
  @Field(() => Int, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Name' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field({ description: 'Value' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  value: string;

  @Field({ description: 'Color' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  color: string;

  @Field(() => DictionaryEntity, { description: 'Dictionary' })
  @ManyToOne(() => DictionaryEntity, (dictionary) => dictionary.records, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  dictionary: DictionaryEntity;

  @Field(() => Date, { description: 'Created at' })
  @CreateDateColumn()
  createdAt: Date;
}
