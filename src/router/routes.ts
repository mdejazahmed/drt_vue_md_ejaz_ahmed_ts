import type { RouteRecordRaw } from 'vue-router';
import { ROUTES } from '@/constants/routeKeys';

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: () => import('@/pages/index.vue'),
    meta: {
      title: 'Home',
      requiresAuth: false,
      layout: 'default'
    }
  },
  {
    path: ROUTES.SELECTED_VIEW.path,
    name: ROUTES.SELECTED_VIEW.name,
    component: () => import('@/pages/selected-view.vue'),
    meta: {
      title: 'Selected View',
      requiresAuth: false,
      layout: 'default'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/pages/not-found.vue'),
    meta: {
      title: 'Page Not Found',
      requiresAuth: false
    }
  }
];
