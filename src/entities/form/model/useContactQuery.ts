import { useMutation } from "@tanstack/react-query";
import { postContact } from "../api/postContactForm";
import type { contactFormPost } from "../model/types";

export const contactQueryKey = ["contact"] as const;

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
