import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export type AllConfigType = {
    dbConfig: TypeOrmModuleOptions | DataSourceOptions;
};
