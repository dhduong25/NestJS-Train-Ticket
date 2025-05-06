import { HttpStatus, Injectable } from '@nestjs/common';
import {
    DeepPartial,
    FindOptionsOrder,
    FindOptionsWhere,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Repository,
} from 'typeorm';
import { AppConstant } from 'utils/constants';
import { PaginationDto, SearchDto } from 'utils/dtos';
import { BadReqException } from 'utils/exception';
import { Response, Result } from 'utils/response';
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

    public async findAll(options: { req: PaginationDto; params?: FindOptionsWhere<T> }): Promise<Result> {
        const searchWhere: FindOptionsWhere<T> = {
            ...this.createQuery(options.req.search),
            ...options.params,
        };

        const skip: number = (options.req.page - 1) * options.req.pageSize;
        const order: FindOptionsOrder<T> = options.req.sortBy
            ? ({
                  [options.req.sortBy]: options.req.order || AppConstant.Order.ASC,
              } as FindOptionsOrder<T>)
            : ({ id: AppConstant.Order.DESC } as FindOptionsOrder<T>);

        const action: string = options.req.action
            ? options.req.action.toUpperCase()
            : AppConstant.Page.NOT_PAGE;

        switch (action) {
            case AppConstant.Page.NOT_PAGE: {
                return Response.ok(await this.typeOrmRepository.find({ where: searchWhere, order }));
            }
            case AppConstant.Page.PAGE: {
                const [data, total] = await this.typeOrmRepository.findAndCount({
                    where: searchWhere,
                    skip,
                    take: options.req.pageSize,
                    order: order,
                });

                const totalPage: number = Math.ceil(total / options.req.pageSize);

                return Response.page({
                    page: options.req.page,
                    content: data,
                    pageSize: options.req.pageSize,
                    pageTotal: totalPage,
                    totalContent: total,
                });
            }
            default:
                return Response.ok(await this.typeOrmRepository.find({ where: searchWhere, order }));
        }
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
            case AppConstant.TypeDelete.SOFT:
                await this.typeOrmRepository.softDelete((options.id as string) ?? options.params);
                return true;
            case AppConstant.TypeDelete.HASH:
                await this.typeOrmRepository.delete((options.id as string) ?? options.params);
                return true;
            default:
                return false;
        }
    }

    private createQuery<T>(search: SearchDto[]): FindOptionsWhere<T> {
        return search.reduce<FindOptionsWhere<T>>(
            (where: FindOptionsWhere<T>, { field, operator, value }) => {
                const key = field as keyof T;
                const operatorsMap: Record<string, (val: any) => any> = {
                    eq: (val: any) => val,
                    ct: (val: any) => Like(`%${val}%`),
                    gt: (val: any) => MoreThan(val),
                    lt: (val: any) => LessThan(val),
                    gte: (val: any) => MoreThanOrEqual(val),
                    lte: (val: any) => LessThanOrEqual(val),
                };

                const mapFn: (val: any) => any = operatorsMap[operator];
                if (!mapFn) {
                    throw new BadReqException(
                        '999',
                        HttpStatus.BAD_REQUEST,
                        `Unsupported operator: ${operator}`,
                    );
                }

                where[key] = mapFn(value);
                return where;
            },
            {},
        );
    }
}
