import { HttpStatus, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import _ from 'lodash';
import { BadReqException } from 'utils/exception';
import { Response, Result } from 'utils/response';
import { CreateUserDTO, SearchUserDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async search(req: SearchUserDto): Promise<Result> {
        return this.userRepository.findAll(req, {}, 'NOT_PAGE');
    }

    public async save(req: CreateUserDTO): Promise<Result> {
        const user: UserEntity = _.isEmpty(req.id) ? await this.create(req) : await this.update(req);
        return Response.ok(user.id);
    }

    public async remove() {
        return await this.userRepository.delete({ id: '01', action: 'SOFT' });
    }

    public async details(id: string) {
        return Response.ok(instanceToPlain(await this.userRepository.repository.find({ where: { id } })));
    }

    private async create(req: CreateUserDTO): Promise<UserEntity> {
        // Step 1: Check existing email
        const checkExistingEmail: boolean = await this.userRepository.existing(req.id, req.email, 'email');

        if (checkExistingEmail) {
            throw new BadReqException('000', HttpStatus.BAD_REQUEST, 'Email is already existing use');
        }

        return await this.userRepository.create(req);
    }

    private async update(req: CreateUserDTO): Promise<UserEntity> {
        return await this.userRepository.update(req.id, req);
    }
}
