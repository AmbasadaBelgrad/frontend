import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import SectionTeam from "../main/layout/ui/sectionTeam";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
      <SectionTeam></SectionTeam>
    </div>
  );
};
