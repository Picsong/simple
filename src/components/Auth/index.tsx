import React, { FC } from 'react';
import { useAuth } from 'ice';
import NoAuth from '@/components/NoAuth';

interface IProps {
  accessible: string;
  fallback?: React.ReactNode;
}
const Auth: FC<IProps> = (props) => {
  const { children, accessible, fallback = <NoAuth /> } = props;
  const [auth] = useAuth();
  // 判断是否有权限
  const hasAuth = auth[accessible];

  return <>{hasAuth ? children : fallback}</>;
};

export default Auth;
