import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvNamesEnum } from '../enums/env-names.enum';

export const typeormConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      return {
        type: 'postgres',
        host: config.get(EnvNamesEnum.db_host),
        port: Number(config.get(EnvNamesEnum.db_port)),
        username: config.get(EnvNamesEnum.db_user),
        password: config.get(EnvNamesEnum.db_password),
        database: config.get(EnvNamesEnum.db_name),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],

        synchronize: false,
      };
    },
    inject: [ConfigService],
  };
};
