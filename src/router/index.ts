import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from './routes';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    layout?: string;
    beforeEnter?: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => Promise<boolean | void> | boolean | void;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global Before Each Guard
router.beforeEach(async (to, from, next) => {
  try {
    // Set page title
    const defaultTitle = "Digantra";
    const pageName = to.meta.title || String(to.name);
    document.title = pageName ? `${pageName} | ${defaultTitle}` : defaultTitle;

    // Call any route-specific guards
    if (to.meta.beforeEnter) {
      const result = await to.meta.beforeEnter(to, from, next);
      if (result === false) {
        return;
      }
    }

    next();
  } catch (error) {
    console.error('Navigation error:', error);
    next(false);
  }
});

export default router;
