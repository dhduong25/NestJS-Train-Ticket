import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Result } from 'utils/response';
import { CreateUserDTO, SearchUserDto } from './dtos';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async search(@Body() req: SearchUserDto): Promise<Result> {
        return this.userService.search(req);
    }

    @Post()
    public async create(@Body() req: CreateUserDTO): Promise<Result> {
        return this.userService.save(req);
    }

    @Get()
    public async details(@Query('id') id: string) {
        return this.userService.details(id);
    }
}
