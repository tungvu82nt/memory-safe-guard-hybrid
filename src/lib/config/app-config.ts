import { QueryClient } from "@tanstack/react-query";

export const THEME_CONFIG = {
  DEFAULT_THEME: "system" as const,
  STORAGE_KEY: "vite-ui-theme",
};

export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "*",
};

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};
