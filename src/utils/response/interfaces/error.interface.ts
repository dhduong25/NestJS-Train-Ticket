import { HttpStatus } from '@nestjs/common';

export interface ErrorInterface {
    code: string;
    status: HttpStatus;
    message: string;
    details?: ErrorsDetails[];
}

export interface ErrorsDetails {
    location?: string;
    method?: string;
    value?: string;
}
