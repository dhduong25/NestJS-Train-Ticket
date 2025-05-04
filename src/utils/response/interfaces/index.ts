import { ErrorInterface } from 'utils/response';
import { SuccessInterface } from 'utils/response';

export * from './success.interface';
export * from './error.interface';

export type Result = SuccessInterface | ErrorInterface;
