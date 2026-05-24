import { routesPaths } from "@shared/config/routesPaths.ts";
import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  // Выбрасываем ошибку сразу
  throw new Error("Тестовая ошибка на главной странице");

  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
    </div>
  );
};
