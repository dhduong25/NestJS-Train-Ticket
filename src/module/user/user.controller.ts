import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { DetailDTO } from 'utils/dtos';
import { Result } from 'utils/response';
import { CreateUserDTO, SearchUserDto, UpdateUserDTO } from './dtos';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('search')
    public async search(@Body() req: SearchUserDto): Promise<Result> {
        return this.userService.search(req);
    }

    @Get()
    public async details(@Query() detail: DetailDTO): Promise<Result> {
        return this.userService.details(detail.id);
    }

    @Post()
    public async create(@Body() req: CreateUserDTO): Promise<Result> {
        return this.userService.save(req);
    }

    @Put()
    public async update(@Body() req: UpdateUserDTO): Promise<Result> {
        return this.userService.save(req);
    }

    @Delete()
    public async delete(@Body() detail: DetailDTO): Promise<Result> {
        return this.userService.remove(detail.id);
    }
}
