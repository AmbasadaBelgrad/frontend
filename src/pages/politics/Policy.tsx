import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";

export const Policy: React.FC = () => {
  return (
    <div>
      <h1>Политика конфиденциальности</h1>
      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};
