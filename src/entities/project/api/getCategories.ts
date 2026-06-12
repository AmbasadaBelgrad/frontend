import { apiClient } from "@/shared/api/client";
import type { Category } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return apiClient.get<Category[]>(apiPaths.projects.categories, { signal });
}
