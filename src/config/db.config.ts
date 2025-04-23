import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'node:path';

configDotenv({ path: join(process.cwd(), '.env') });

const envFile: string = process.env.ENVIRONMENT ? `.env.${process.env.ENVIRONMENT}` : '.env';

if (envFile !== '.env') {
    configDotenv({ path: join(process.cwd(), envFile), override: false });
}

const DbConfig: DataSourceOptions = {
    type: (process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | undefined) ?? 'mysql',
    database: process.env.DB_NAME ?? '',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../db/migrations/*{.ts,.js}`],
    synchronize: process.env.ENVIRONMENT === 'local',
};

export default registerAs(
    'dbConfig',
    (): TypeOrmModuleOptions => ({
        ...DbConfig,
        autoLoadEntities: process.env.ENVIRONMENT === 'local',
    }),
);

export const DataSourceConnect = new DataSource(DbConfig);
