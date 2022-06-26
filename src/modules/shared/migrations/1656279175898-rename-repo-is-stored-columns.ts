import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { REPO_TABLE_NAME } from '../constants/database.constant'

export class renameRepoIsStoredColumns1656279175898 implements MigrationInterface {
  private oldIsStoredName = 'is_storaged'
  private oldStoredAtName = 'storaged_at'
  private isStoredName = 'is_stored'
  private storedAtName = 'stored_at'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      REPO_TABLE_NAME,
      this.oldIsStoredName,
      new TableColumn({
        name: this.isStoredName,
        type: 'boolean',
        default: true
      })
    )

    await queryRunner.changeColumn(
      REPO_TABLE_NAME,
      this.oldStoredAtName,
      new TableColumn({
        name: this.storedAtName,
        type: 'timestamptz',
        default: 'now()'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      REPO_TABLE_NAME,
      this.isStoredName,
      new TableColumn({
        name: this.oldIsStoredName,
        type: 'boolean',
        default: true
      })
    )

    await queryRunner.changeColumn(
      REPO_TABLE_NAME,
      this.storedAtName,
      new TableColumn({
        name: this.oldStoredAtName,
        type: 'timestamptz',
        default: 'now()'
      })
    )
  }
}
