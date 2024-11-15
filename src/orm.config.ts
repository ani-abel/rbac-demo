import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const { DATABASE_URL, DATABASE_LOCAL_URL } = process.env;

let config: PostgresConnectionOptions = {
  type: 'postgres',
  url: DATABASE_LOCAL_URL,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  logging: ['error', 'query'],
  logger: 'file',
  cache: { duration: 1000 * 60 * 30 }, //cache for 30 minutes
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  ssl: false,
};
export default config;
