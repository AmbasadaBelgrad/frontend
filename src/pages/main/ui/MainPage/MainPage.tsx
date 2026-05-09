import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { apiClient } from "@shared/api/client";
import type { HomeResponse } from "@/pages/main/ui/MainPage/types";

const MainPage = () => {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<HomeResponse>("/api/v1/home")
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError("Ошибка загрузки");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <div className={styles.mainContainer}>
      {/* HeroSection */}
      {/* AboutSection */}
      {/* TeamSection */}
      {/* ProjectsSection */}
      {/* ContactSection */}
    </div>
  );
};

export default MainPage;
