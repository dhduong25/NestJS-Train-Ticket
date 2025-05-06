export class PaginationDto {
    page: number;

    pageNum: number;

    pageSize: number;

    sortBy: string;

    order: 'DESC' | 'ASC';
}
