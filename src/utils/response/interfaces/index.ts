import { ErrorInterface } from './error.interface';
import { SuccessInterface } from './success.interface';

export * from './success.interface';
export * from './error.interface';

export type Result = SuccessInterface | ErrorInterface;
