import { apiClient } from "@/shared/api/client";
import type { contactFormGetResponse } from "../model/types";

export function getContact(
  signal?: AbortSignal,
): Promise<contactFormGetResponse> {
  return apiClient.get<contactFormGetResponse>("/contact", { signal });
}
