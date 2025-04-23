import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DbConfig from 'config/db.config';
import { UserModule } from './module/user/user.module';
import { DbModule } from './db/db.module';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [DbConfig],
            envFilePath: ['.env.local', '.env'],
        }),
        DbModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
