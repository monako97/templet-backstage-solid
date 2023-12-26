import { lazy } from 'solid-js';
import type { RouteConfig } from '@app/routes';

const router: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/layout')),
    children: [
      {
        path: '/',
        component: lazy(() => import('@/pages')),
      },
      // 配置自定义路由
      {
        path: 'about',
        children: [
          {
            path: '/',
            component: lazy(() => import('@/pages/home')),
          },
        ],
      },
    ],
  },
];

export default router;
