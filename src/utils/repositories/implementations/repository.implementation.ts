import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from '../../entities';
import { RepositoryInterface } from '../interfaces';

@Injectable()
export class RepositoryImplementation<T extends BaseEntity>
    extends Repository<T>
    implements RepositoryInterface<T>
{
    public async findAll(): Promise<T[]> {
        return this.find({});
    }
}
