import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import ormconfig from './orm.config';

export default {
  ...ormconfig,
  entities: [join(__dirname, './src/modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './src/migrations/tenanted/*{.ts,.js}')],
} as PostgresConnectionOptions;
