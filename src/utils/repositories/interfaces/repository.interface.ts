import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { PaginationDto } from 'utils/dtos';
import { Result } from 'utils/response';

export interface RepositoryInterface<T> {
    findAll(options: { req: PaginationDto; params?: FindOptionsWhere<T> }): Promise<Result | void>;

    create(data: T | DeepPartial<T>): Promise<T>;

    existing(id: string, fieldValue: any, fieldName: keyof T): Promise<boolean>;

    delete(options: {
        id?: string;
        params?: FindOptionsWhere<T>;
        action?: 'SOFT' | 'HASH';
    }): Promise<boolean>;
}
