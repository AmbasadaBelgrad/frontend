import { useQuery } from "@tanstack/react-query";
import { getPolicy } from "../api/getPolicy";

export const policyQueryKey = ["policy"] as const;

const POLICY_STALE_TIME = 5 * 60 * 1000;
const POLICY_GC_TIME = 10 * 60 * 1000;

export function usePolicyQuery() {
  return useQuery({
    queryKey: policyQueryKey,
    queryFn: () => getPolicy(),
    staleTime: POLICY_STALE_TIME,
    gcTime: POLICY_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
