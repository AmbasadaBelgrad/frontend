import { apiClient } from "@/shared/api/client";
import type { ProjectsResponse, GetProjectsParams } from "../model/types";
import { apiPaths } from "@/shared/api/config/apiPaths";

export function getProjects(
  params: GetProjectsParams,
  signal?: AbortSignal,
): Promise<ProjectsResponse> {
  const urlParams = new URLSearchParams({
    limit: String(params.limit),
    offset: String(params.offset),
  });

  if (params.search) {
    urlParams.append("search", params.search);
  }

  if (params.type && params.type !== "all") {
    urlParams.append("type", params.type);
  }

  if (params.tags && params.tags.length > 0) {
    urlParams.append("tags", params.tags.join(","));
  }

  return apiClient.get<ProjectsResponse>(
    `${apiPaths.projects}?${urlParams.toString()}`,
    {
      signal,
    },
  );
}
