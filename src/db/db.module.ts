import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllConfigType } from 'config/types';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<AllConfigType>) =>
                configService.getOrThrow('dbConfig', { infer: true }),
        }),
    ],
})
export class DbModule {}
