import { ErrorInterface, SuccessInterface } from 'utils/response';

export * from './success.interface';
export * from './error.interface';

export type Result = SuccessInterface | ErrorInterface;
