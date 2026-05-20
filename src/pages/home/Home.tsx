import React from "react";
import styles from "./Home.module.css";
import { useHomeQuery } from "@/entities/init/home/useHomeQuery";


export const Home: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useHomeQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return (
      <div>
        {error instanceof Error
          ? error.message
          : "Ошибка загрузки"}
      </div>
    );
  }

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

export default Home;

