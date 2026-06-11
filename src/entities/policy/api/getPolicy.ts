import { apiClient } from "@/shared/api/client";
import type { PoliticsResponse } from "../model/types";

export async function getPolicy(): Promise<string> {
  const response = await apiClient.get<PoliticsResponse>("/politics");
  return response.text;
}
