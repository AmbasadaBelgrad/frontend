import { apiClient } from "@/shared/api/client";
import type { HomeResponse } from "@pages/main/ui/MainPage/types";

export function getHome(
  signal?: AbortSignal,
): Promise<HomeResponse> {
  return apiClient.get<HomeResponse>(
    "/api/v1/home",
    { signal },
  );
}
