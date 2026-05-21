import { useQuery, useMutation } from "@tanstack/react-query";
import { getContact } from "../api/getContactForm";
import { postContact } from "../api/postContactForm";
import type { contactFormPost } from "../model/types";

export const contactQueryKey = ["contact"] as const;

const INIT_STALE_TIME = 30 * 60 * 1000;
const INIT_GC_TIME = 60 * 60 * 1000;

export function useContactQuery() {
  return useQuery({
    queryKey: contactQueryKey,
    queryFn: ({ signal }) => getContact(signal),
    staleTime: INIT_STALE_TIME,
    gcTime: INIT_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function usePostContact() {
  return useMutation({
    mutationFn: (data: contactFormPost) => postContact(data),
    onSuccess: (response) => {
      console.log("Форма успешно отправлена:", response);
    },
    onError: (error) => {
      console.error("Ошибка при отправке формы:", error);
    },
  });
}
