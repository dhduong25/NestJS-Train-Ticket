import { HttpStatus } from '@nestjs/common';

export interface SuccessInterface {
    code?: string;
    message?: string;
    status?: HttpStatus;
    data: any;
}

export interface PagingResponseInterface<T> {
    page: number;
    pageSize: number;
    pageTotal: number;
    totalContent: number;
    content: T[];
}
