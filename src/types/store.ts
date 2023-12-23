import { ApiErrorResponseType } from './api';

export interface StateType<T = any> {
  pending: boolean;
  result?: T | null;
  error: ApiErrorResponseType | null;
}
