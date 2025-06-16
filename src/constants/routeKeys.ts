interface RouteConfig {
  name: string;
  path: string;
}

interface RoutesConfig {
  [key: string]: RouteConfig;
}

export const ROUTES: RoutesConfig = {
  LOGIN: {
    name: "login",
    path: "/login",
  },  
  HOME: {
    name: "home",
    path: "/",
  },  
  SELECTED_VIEW: {
    name: "selected-view",
    path: "/selected-view",
  },
} as const;
