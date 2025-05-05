import { DeepPartial, FindOptionsWhere } from 'typeorm';

export interface RepositoryInterface<T> {
    findAll(): Promise<T[]>;

    create(data: T | DeepPartial<T>): Promise<T>;

    existing(id: string, fieldValue: any, fieldName: keyof T): Promise<boolean>;

    findAllWithPage(): Promise<T[]>;

    delete(options: {
        id?: string;
        params?: FindOptionsWhere<T>;
        action?: 'SOFT' | 'HASH';
    }): Promise<boolean>;
}
