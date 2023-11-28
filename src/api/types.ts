export interface StateType<T = any> {
  pending: boolean;
  result?: T;
  error: ErrorResponseType | null;
}

export interface ErrorResponseType {
  error?: string;
  message: any;
  statusCode?: number;
}
