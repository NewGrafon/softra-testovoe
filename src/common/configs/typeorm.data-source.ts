import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { EnvNamesEnum } from '../enums/env-names.enum';
import { checkEnvironment } from '../functions/env-checker.function';

config();

checkEnvironment(process.env);

export const typeormDataSource = new DataSource({
  type: 'postgres',
  host: process.env[EnvNamesEnum.db_host],
  port: Number(process.env[EnvNamesEnum.db_port]),
  username: process.env[EnvNamesEnum.db_user],
  password: process.env[EnvNamesEnum.db_password],
  database: process.env[EnvNamesEnum.db_name],
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
