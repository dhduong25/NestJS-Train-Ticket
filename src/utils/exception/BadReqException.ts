import { HttpException, HttpStatus } from '@nestjs/common';

export class BadReqException extends HttpException {
    constructor(code: string, status: HttpStatus, message: string) {
        super({ message, code, status }, status);
    }
}
