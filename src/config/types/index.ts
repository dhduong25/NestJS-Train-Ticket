import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from 'config/types/app.config';
import { DataSourceOptions } from 'typeorm';

export * from './app.config';

export type AllConfigType = {
    dbConfig: TypeOrmModuleOptions | DataSourceOptions;
    appConfig: AppConfig;
};
