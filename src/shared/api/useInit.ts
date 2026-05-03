import { useEffect, useState } from "react";

export type InitResponse = {
  socials: {
    linkedin?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };

  legal_links: {
    privacy_policy?: string;
    personal_data_processing_agreement?: string;
  };

  copyright: string;

  status?: string;
  timestamp?: number;
};

export const useInit = () => {
  const [data, setData] = useState<InitResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInit = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/v1/init", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Accept: "application/json",
          },
        });

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          const text = await res.text();

          console.error("[useInit] INVALID RESPONSE (NOT JSON):", text);

          throw new Error(
            "API returned HTML instead of JSON → MSW is NOT working",
          );
        }

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json: InitResponse = await res.json();

        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadInit();
  }, []);

  return { data, loading, error };
};
