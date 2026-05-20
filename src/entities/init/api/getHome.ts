import { apiClient } from "@/shared/api/client";
import type { HomeResponse } from "../home/model/types";

export function getHome(
  signal?: AbortSignal,
): Promise<HomeResponse> {
  return apiClient.get<HomeResponse>(
    "/home",
    { signal },
  );
}
