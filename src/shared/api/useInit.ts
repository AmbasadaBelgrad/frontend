import { useEffect, useState } from "react";

type InitResponse = {
  site_name: string;
  languages: { code: string; label: string }[];
};

export const useInit = () => {
  const [data, setData] = useState<InitResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const loadInit = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/v1/init");

        if (!res.ok) {
          throw new Error("Failed to fetch init");
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
