import styles from "./MainPage.module.css";
import { useHomeQuery } from "@/entities/init/model/useHomeQuery";

const MainPage = () => {
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

export default MainPage;
