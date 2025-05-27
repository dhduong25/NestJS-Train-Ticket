import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
    debug(message: any, context: string): any {}

    error(message: any, ...optionalParams: any[]): any {}

    log(message: any, ...optionalParams: any[]): any {}

    warn(message: any, ...optionalParams: any[]): any {}
}
