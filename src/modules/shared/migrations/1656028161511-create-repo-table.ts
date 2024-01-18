import { MigrationInterface, QueryRunner, Table, TableColumnOptions } from 'typeorm'
import { REPO_TABLE_NAME } from '../constants/database.constant'

export class createRepoTable1656028161511 implements MigrationInterface {
  constructor(
    private tableColumns: TableColumnOptions[] = [
      {
        name: 'db_id',
        type: 'uuid',
        isGenerated: true,
        generationStrategy: 'uuid',
        isUnique: true,
        default: 'uuid_generate_v1()'
      },
      {
        name: 'id',
        type: 'int',
        isNullable: true
      },
      {
        name: 'name',
        type: 'text',
        isNullable: true
      },
      {
        name: 'full_name',
        type: 'text',
        isNullable: true
      },
      {
        name: 'description',
        type: 'text',
        isNullable: true
      },
      {
        name: 'html_url',
        type: 'text',
        isNullable: true
      },
      {
        name: 'url',
        type: 'text',
        isNullable: true
      },
      {
        name: 'stargazers_count',
        type: 'int',
        isNullable: true
      },
      {
        name: 'open_issues',
        type: 'int',
        isNullable: true
      },
      {
        name: 'forks',
        type: 'int',
        isNullable: true
      },
      {
        name: 'watchers',
        type: 'int',
        isNullable: true
      },
      {
        name: 'watchers_count',
        type: 'int',
        isNullable: true
      },
      {
        name: 'language',
        type: 'text',
        isNullable: true
      },
      {
        name: 'is_storaged',
        type: 'boolean',
        default: true
      },
      {
        name: 'created_at',
        type: 'timestamptz'
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: true
      },
      {
        name: 'storaged_at',
        type: 'timestamptz',
        default: 'now()'
      }
    ]
  ) {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryRunner.createTable(
      new Table({
        name: REPO_TABLE_NAME,
        columns: this.tableColumns
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(REPO_TABLE_NAME)
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";')
  }
}
