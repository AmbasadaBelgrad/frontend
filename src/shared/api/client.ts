import { createApiClient } from "./lib/api-client";
import i18n from "../config/i18n.ts";

const getCurrentLanguage = (): string => {
  return i18n.language;
};

export const apiClient = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
  getLanguage: getCurrentLanguage,
});
