import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1722608597766 implements MigrationInterface {
    name = 'Initial1722608597766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dictionaries" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b864abffe7546b378d6ce4ba7c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "records" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, "color" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "dictionaryId" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_1af89ab4ad933bec62c6bb4fc5b" FOREIGN KEY ("dictionaryId") REFERENCES "dictionaries"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_1af89ab4ad933bec62c6bb4fc5b"`);
        await queryRunner.query(`DROP TABLE "records"`);
        await queryRunner.query(`DROP TABLE "dictionaries"`);
    }

}
