import { usePolicyQuery } from "@/entities/policy";
import { safeCode } from "@/shared/lib/safeCode"; // 👈 импортируем функцию
import { QueryStateFallback } from "@/shared/ui/QueryStateFallback";
import React from "react";
import styles from "./Policy.module.css";

export const Policy: React.FC = () => {
  const { data: policyHtml, isLoading, isError, error } = usePolicyQuery();

  if (isLoading || isError) {
    return (
      <QueryStateFallback
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  if (!policyHtml) {
    return null;
  }

  const sanitizedHtml = safeCode(policyHtml);

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
};
