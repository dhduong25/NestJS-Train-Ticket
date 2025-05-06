import { HttpStatus } from '@nestjs/common';

export interface SuccessInterface {
    code?: string;
    message?: string;
    status?: HttpStatus;
    data: any;
}

export interface PagingResponseInterface<T> {
    page: number;
    pageNum: number;
    pageSize: number;
    pageTotal: number;
    content: T[];
}
