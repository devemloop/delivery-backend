import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class productsTable1647280118901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar(100)',
          },
          {
            name: 'reference',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'numeric(2)',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('products');
  }
}
