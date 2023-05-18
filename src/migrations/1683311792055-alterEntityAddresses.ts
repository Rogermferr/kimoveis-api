import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEntityAddresses1683311792055 implements MigrationInterface {
    name = 'AlterEntityAddresses1683311792055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipdCode" TO "zipCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipCode" TO "zipdCode"`);
    }

}
