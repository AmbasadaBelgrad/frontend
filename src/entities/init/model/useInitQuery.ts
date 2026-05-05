import { useQuery } from "@tanstack/react-query";
import { getInit } from "../api/getInit";

export const initQueryKey = ["init"] as const;

export function useInitQuery() {
  return useQuery({
    queryKey: initQueryKey,
    queryFn: ({ signal }) => getInit(signal),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });
}
