import { request } from 'ice';
import { IUser, ILoginData } from '@/types/user';
import { IResponse } from '@/types/index';
export const login = async (data: ILoginData): Promise<IResponse<IUser>> => {
  return await request.post('/user/login', data);
};
