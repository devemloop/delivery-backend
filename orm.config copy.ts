import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'vVBQ7pgHHF4x',
  database: 'delivery',
  entities: [join(__dirname, './src/modules/public/**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [join(__dirname, './src/migrations/public/*{.ts,.js}')],
  migrationsTableName: 'migrations_typeorm',
} as PostgresConnectionOptions;
