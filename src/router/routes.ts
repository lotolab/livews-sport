import type { RouteRecordRaw } from 'vue-router';
import { RootLayout, RootRedirectPath } from './route.constants';

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: RootRedirectPath,
    component: RootLayout,
    meta: {
      title: ''
    },
    children: [
      {
        path: '/football',
        name: 'FootballIndex',
        component: () => import('@/views/football/index.vue')
      }
    ]
  }
];
