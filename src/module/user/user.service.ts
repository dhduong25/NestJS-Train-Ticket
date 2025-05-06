import { HttpStatus, Injectable } from '@nestjs/common';
import _ from 'lodash';
import { AppConstant } from 'utils/constants';
import { BadReqException } from 'utils/exception';
import { Response, Result } from 'utils/response';
import { CreateUserDTO, SearchUserDto, UpdateUserDTO } from './dtos';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async search(req: SearchUserDto): Promise<Result> {
        return this.userRepository.findAll({ req });
    }

    public async save(req: CreateUserDTO | UpdateUserDTO): Promise<Result> {
        const user: UserEntity = _.isEmpty(req.id) ? await this.create(req) : await this.update(req);
        return Response.ok(user.id);
    }

    public async remove(id: string): Promise<Result> {
        return Response.ok(await this.userRepository.delete({ id: id, action: AppConstant.TypeDelete.SOFT }));
    }

    public async details(id: string): Promise<Result> {
        const result: UserEntity = await this.userRepository.findOne({ id });
        return Response.ok(result);
    }

    private async create(req: CreateUserDTO): Promise<UserEntity> {
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
