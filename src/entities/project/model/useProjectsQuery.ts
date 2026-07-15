import {
  useQuery,
  keepPreviousData,
  type UseQueryResult,
} from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";
import type { ProjectsResponse, GetProjectsParams } from "./types";

const INIT_STALE_TIME = 5 * 60 * 1000;
const INIT_GC_TIME = 10 * 60 * 1000;

export function useProjectsQuery(
  params: GetProjectsParams,
): UseQueryResult<ProjectsResponse> {
  const queryKey = [
    "projects",
    params.limit,
    params.offset,
    params.search || "",
    params.type || "",
    params.tag?.join(",") || "",
  ];

  return useQuery<ProjectsResponse>({
    queryKey,
    queryFn: ({ signal }) => getProjects(params, signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false, // Изменено с "if-stale" на false
    placeholderData: keepPreviousData,
  });
}
