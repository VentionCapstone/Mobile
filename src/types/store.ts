export interface StateType<T = any> {
  pending: boolean;
  result?: T | null;
  error: ErrorResponseType | null;
}

export interface ErrorResponseType {
  error?: string;
  message: any;
  statusCode?: number;
}
