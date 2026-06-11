import { useHomeQuery } from "@/entities/home/model/useHomeQuery";
import ContactSection from "@/widgets/contact-section/ContactSection";
import { routesPaths } from "@shared/config/routesPaths.ts";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const { data, isLoading, isError, error } = useHomeQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return (
      <div>{error instanceof Error ? error.message : "Ошибка загрузки"}</div>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className={styles.mainContainer}>
        <h1>Главная страница</h1>
        <Link to={routesPaths.projects}>Проекты</Link>
        {/* HeroSection */}
        {/* AboutSection */}
        {/* TeamSection */}
        {/* ProjectsSection */}
      </div>
      <ContactSection />
    </>
  );
};

export default Home;
