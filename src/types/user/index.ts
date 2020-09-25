import { IAuth } from '../auth';

export interface IUser {
  name: string;
  avatar: string;
  token: string;
  role: string;
  auth: IAuth;
}

export type UserAuth = Pick<IUser, 'role' | 'auth'>;

export type UserInfo = Omit<IUser, 'token' | 'auth'>;

export interface ILoginData {
  loginName: string;
  password: string;
}
