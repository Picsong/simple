import { request } from 'ice';
import { IUser, UserInfo } from '@/types/user';

export const getInitialData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  const data = (await request('/user/auth')) as IUser;
  const { role, auth } = data;
  return {
    auth: {
      admin: role === 'admin',
      guest: role === 'guest',
      ...auth
    }
  };
};

export const getUserInfo = async (): Promise<UserInfo> => request('/user/info');
