import type { ErrorInfo } from "react";

export interface ErrorPayload {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
}

export const createErrorPayload = (
  error: Error | null,
  errorInfo: ErrorInfo | null,
): ErrorPayload => {
  return {
    message: error?.message || "Unknown error",
    stack: error?.stack,
    componentStack: errorInfo?.componentStack ?? undefined, // Исправление
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };
};

export const logError = (
  error: Error | null,
  errorInfo: ErrorInfo | null,
): void => {
  const payload = createErrorPayload(error, errorInfo);

  console.error("ERROR REPORT:", payload);

  /**
   * позже: запрос на сервер
   */
};
