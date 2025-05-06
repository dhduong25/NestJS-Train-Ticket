import { HttpStatus } from '@nestjs/common';
import {
    ErrorInterface,
    ErrorsDetails,
    PagingResponseInterface,
    Result,
    SuccessInterface,
} from './interfaces';

export class Response {
    public static ok<T>(
        data: T,
        code: string = '000',
        message: string = 'OK',
        status: HttpStatus = HttpStatus.OK,
    ): Result {
        return this.successResponse<T>(data, code, message, status);
    }

    public static page<T>(
        pageData: PagingResponseInterface<T>,
        code: string = '000',
        message: string = 'PAGE',
        status: HttpStatus = HttpStatus.OK,
    ): Result {
        return this.successResponse(pageData, code, message, status ?? HttpStatus.OK);
    }

    public static created<T>(data: T, code: string = '000', message: string = 'CREATE'): Result {
        return this.successResponse(data, code, message, HttpStatus.CREATED);
    }

    public static error(
        code: string,
        status: HttpStatus,
        message: string,
        details?: ErrorsDetails[],
    ): Result {
        return this.errorResponse(code, status, message, details);
    }

    private static successResponse<T>(
        data: T,
        code?: string,
        message?: string,
        status?: HttpStatus,
    ): SuccessInterface {
        return {
            code,
            message,
            status,
            data,
        };
    }

    private static errorResponse(
        code: string,
        status: HttpStatus,
        message: string,
        details?: ErrorsDetails[],
    ): ErrorInterface {
        return {
            code,
            status,
            message,
            details,
        };
    }
}
