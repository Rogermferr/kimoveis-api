import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAddress1683549660512 implements MigrationInterface {
    name = 'AlterTableAddress1683549660512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" SET NOT NULL`);
    }

}
