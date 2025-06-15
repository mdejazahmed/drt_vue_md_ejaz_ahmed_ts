/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Global Before Each Guard
router.beforeEach(async (to, from, next) => {
  try {
    //Set page title
    const defaultTitle = "Digantra";
    const pageName = to.meta.title || to.name;
    document.title = pageName ? `${pageName} | ${defaultTitle}` : defaultTitle;

    // Call any route-specific guards
    if (to.meta.beforeEnter) {
      const result = await to.meta.beforeEnter(to, from);
      if (result === false) {
        return;
      }
    }

    next();
  } catch (error) {
    console.error("Router guard error:", error);
    next("/error");
  }
});

// Global After Each Guard
router.afterEach((to, from) => {
  // Handle scroll position
  if (to.meta.scrollToTop) {
    window.scrollTo(0, 0);
  }

  // Handle layout changes
  if (to.meta.layout) {
    console.log("Using layout:", to.meta.layout);
  }

  // Log navigation
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

export default router;
