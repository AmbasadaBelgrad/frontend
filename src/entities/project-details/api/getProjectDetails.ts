import { apiClient } from "@/shared/api/client";
import type { IProjectDetailsResponse } from "../model/types";

export function getProjectDetails(
  id: string,
  signal?: AbortSignal,
): Promise<IProjectDetailsResponse> {
  if (!id) {
    throw new Error("Project ID is required");
  }
  return apiClient.get<IProjectDetailsResponse>(`/projects/${id}`, { signal });
}
