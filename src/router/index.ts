import type { App } from 'vue';
import { dynamicRoutes } from './routes';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';

export const allRoutes: RouteRecordRaw[] = [...dynamicRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export function setupRouter(app: App) {
  app.use(router);
  //TODO guards
}

export default router;
