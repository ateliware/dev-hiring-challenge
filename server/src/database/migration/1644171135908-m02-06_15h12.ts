import {MigrationInterface, QueryRunner} from "typeorm";

export class m020615h121644171135908 implements MigrationInterface {
    name = 'm020615h121644171135908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "git_hub_repository_card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "owner" character varying NOT NULL, "description" character varying, "language" character varying, "forks" character varying NOT NULL, "open_issues" character varying NOT NULL, "watchers" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae77ecbb310ae3a574f6c8f2701" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "git_hub_repository_card"`);
    }

}
