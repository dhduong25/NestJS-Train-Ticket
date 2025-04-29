import { HttpStatus } from '@nestjs/common';
import { ErrorInterface, ErrorsDetails, Result, SuccessInterface } from './interfaces';

export class Response {
    public static ok<T>(data: T, code?: string, message?: string, status?: HttpStatus): Result {
        return this.successResponse<T>(data, code, message, status);
    }

    public static created<T>(data: T, code: string, message: string): Result {
        return this.successResponse(data, code, message, HttpStatus.CREATED);
    }

    public static error(
        code: string,
        status: HttpStatus,
        message: string,
        details: ErrorsDetails[],
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
