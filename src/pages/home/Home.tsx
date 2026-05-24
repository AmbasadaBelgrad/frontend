import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { AboutCommunity } from "./ui/AboutCommunity";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
      <AboutCommunity />
    </div>
  );
};
