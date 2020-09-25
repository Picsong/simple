import { lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Var = lazy(() => import('@/pages/Var'));

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
      {
        path: '/',
        redirect: '/user/login'
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/var',
        component: Var
      }
    ]
  }
];

export default routerConfig;
