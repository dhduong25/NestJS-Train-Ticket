import { HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { BadReqException } from 'utils/exception';
import { BaseEntity } from '../../entities';
import { RepositoryInterface } from '../interfaces';

@Injectable()
export class RepositoryImplementation<T extends BaseEntity> implements RepositoryInterface<T> {
    protected constructor(private readonly typeOrmRepository: Repository<T>) {}

    get repository(): Repository<T> {
        return this.typeOrmRepository;
    }

    public async create(data: T | DeepPartial<T>): Promise<T> {
        return this.typeOrmRepository.save(this.typeOrmRepository.create(data));
    }

    public async update(id: any, data: Partial<T> | T): Promise<T> {
        const t: T | null = await this.typeOrmRepository.findOne({ where: { id } });

        if (!t) {
            throw new BadReqException('000', HttpStatus.BAD_REQUEST, `Data with id ${id} now found`);
        }

        Object.assign(t, data);
        return await this.typeOrmRepository.save(t);
    }

    public async findAll(): Promise<T[]> {
        return this.typeOrmRepository.find({});
    }

    public async findAllWithPage(): Promise<T[]> {
        return this.typeOrmRepository.find({});
    }

    public async existing(id: string, fieldValue: any, fieldName: keyof T): Promise<boolean> {
        const t: T | null = await this.typeOrmRepository.findOneBy({
            [fieldName]: fieldValue,
        } as FindOptionsWhere<T>);

        return t?.id != id;
    }

    public async delete(options: {
        id?: any;
        params?: FindOptionsWhere<T>;
        action?: 'SOFT' | 'HASH';
    }): Promise<boolean> {
        switch (options.action) {
            case 'SOFT':
                await this.typeOrmRepository.softDelete((options.id as string) ?? options.params);
                return true;
            case 'HASH':
                await this.typeOrmRepository.delete((options.id as string) ?? options.params);
                return true;
            default:
                return false;
        }
    }
}
