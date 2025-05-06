import { IsNumber, IsOptional, Min } from 'class-validator';

class SortDto {
    @IsOptional()
    sortBy: string;

    @IsOptional()
    order: 'DESC' | 'ASC' | 'desc' | 'asc';
}

export class SearchDto {
    @IsOptional()
    field: string;

    @IsOptional()
    value: any;

    @IsOptional()
    operator: 'eq' | 'ct' | 'gt' | 'lt' | 'gte' | 'lte';
}

export class PaginationDto extends SortDto {
    @IsNumber()
    @Min(1)
    page: number = 1;

    @IsNumber()
    @Min(10)
    pageSize: number = 10;

    @IsOptional()
    action: 'PAGE' | 'NOT_PAGE' | 'page' | 'not_page';

    @IsOptional()
    search: SearchDto[];
}
