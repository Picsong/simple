import React from 'react';
import { createApp, IAppConfig, config } from 'ice';
import { getInitialData } from '@/services/user';
import NoAuth from '@/components/NoAuth';
const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    parseSearchParams: true,
    getInitialData
  },
  auth: {
    // 可选的，设置无权限时的展示组件，默认为 null
    NoAuthFallback: <NoAuth></NoAuth>
  },
  router: {
    fallback: <div>loading...</div>
  },
  request: {
    baseURL: config.baseURL,
    interceptors: {
      request: {
        onConfig: (config) => {
          // 发送请求前：可以对 RequestConfig 做一些统一处理
          config.headers = {
            ...config.headers,
            token: localStorage.getItem('token')
          };
          return config;
        },
        onError: (error) => {
          return Promise.reject(error);
        }
      },
      response: {
        onConfig: (response) => {
          // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
          return response;
        },
        onError: (error) => {
          // 请求出错：服务端返回错误状态码
          return Promise.reject(error);
        }
      }
    }
  }
};

createApp(appConfig);
