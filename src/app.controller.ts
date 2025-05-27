import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
    @Get()
    public Ping(): string {
        return 'Pong!!!';
    }
}
