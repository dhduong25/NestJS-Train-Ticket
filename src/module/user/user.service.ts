import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryImplementation } from '../../utils';
import { Response, Result } from '../../utils/response';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: RepositoryImplementation<UserEntity>,
    ) {}

    public async save(): Promise<Result> {
        return Response.ok(await this.userRepository.findAll());
    }

    private create(): void {}

    private update(): void {}
}
