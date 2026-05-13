import styles from "./MainPage.module.css";
import { useInitQuery } from "@/entities/init";

const MainPage = () => {
  const { data } = useInitQuery();

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
