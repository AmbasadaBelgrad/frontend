import { apiClient } from "@/shared/api/client";
import React, { useEffect, useState } from "react";
import styles from "./Policy.module.css";
import type { PoliticsResponse } from "./Policy.types";

export const Policy: React.FC = () => {
  const [policyHtml, setPolicyHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<PoliticsResponse>("/politics");
        setPolicyHtml(response.text);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить политику конфиденциальности");
        console.error("Error fetching policy:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!policyHtml) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: policyHtml }}
      />
    </div>
  );
};
