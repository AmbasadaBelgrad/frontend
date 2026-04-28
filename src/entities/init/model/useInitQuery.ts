import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getInit } from "../api/getInit";

export const initQueryKey = (language: string) => ["init", language] as const;

export function useInitQuery() {
  const { i18n } = useTranslation();

  const language = i18n.language || "ru";

  return useQuery({
    queryKey: initQueryKey(language),
    queryFn: ({ signal }) => getInit(signal),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });
}
