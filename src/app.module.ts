import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { typeormConfig } from './common/configs/typeorm.config';
import { DictionariesModule } from './dictionaries/dictionaries.module';
import { RecordsModule } from './records/records.module';
import { EnvNamesEnum } from './common/enums/env-names.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormConfig()),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          autoSchemaFile: 'src/schema.gql',
          playground: config.get(EnvNamesEnum.mode) !== 'PROD',
          // plugins: [ApolloServerPluginLandingPageLocalDefault()],
        };
      },
      inject: [ConfigService],
    }),
    DictionariesModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
