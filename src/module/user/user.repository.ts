import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryImplementation } from 'utils/repositories';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends RepositoryImplementation<UserEntity> {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
        super(userRepository);
    }
}
