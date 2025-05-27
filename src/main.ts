import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { AllConfigType } from 'config/types';
import { AppModule } from './app.module';
import { AppLogger } from './logger/app.logger';

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule);
    const configService: ConfigService<AllConfigType> = app.get(ConfigService<AllConfigType>);

    app.useLogger(new AppLogger());
    app.enableCors();

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    await app.listen(configService.get('appConfig.port', { infer: true }) ?? 3000);
}

void bootstrap();
