import React, { useEffect } from 'react';
import { store } from 'ice';
export default function Var() {
  // 调用定义的 user 模型
  const [userState, userDispatchers] = store.useModel('user');

  useEffect(() => {
    // 调用 user 模型中的 fetchUserInfo 方法
    userDispatchers.fetchUserInfo();
  }, []);
  return <div>{userState.name}</div>;
}

Var.pageConfig = {
  auth: ['var']
};
