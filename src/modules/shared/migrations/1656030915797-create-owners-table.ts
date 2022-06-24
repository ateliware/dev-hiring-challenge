import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions
} from 'typeorm'
import { OWNER_TABLE_NAME } from '../constantes/database.constant'

export class createOwnersTable1656030915797 implements MigrationInterface {
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
        name: 'login',
        type: 'text',
        isNullable: true
      },
      {
        name: 'avatar_url',
        type: 'text',
        isNullable: true
      },
      {
        name: 'url',
        type: 'text',
        isNullable: true
      },
      {
        name: 'html_url',
        type: 'text',
        isNullable: true
      },
      {
        name: 'repos_url',
        type: 'text',
        isNullable: true
      },
      {
        name: 'type',
        type: 'text',
        isNullable: true
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()'
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: true
      },
      {
        name: 'deleted_at',
        type: 'timestamptz',
        isNullable: true
      }
    ]
  ) {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: OWNER_TABLE_NAME,
        columns: this.tableColumns
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(OWNER_TABLE_NAME)
  }
}
