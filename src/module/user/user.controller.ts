import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Result } from 'utils/response';
import { CreateUserDTO } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async create(@Body() req: CreateUserDTO): Promise<Result> {
        return this.userService.save(req);
    }

    @Get('')
    public async details(@Query('id') id: string) {
        return this.userService.details(id);
    }
}
