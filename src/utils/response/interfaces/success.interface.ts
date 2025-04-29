import { HttpStatus } from '@nestjs/common';

export interface SuccessInterface {
    code?: string;
    message?: string;
    status?: HttpStatus;
    data: any;
}
