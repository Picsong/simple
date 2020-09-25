export * from './auth';
export * from './user';

export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}
