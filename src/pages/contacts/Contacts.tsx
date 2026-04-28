import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";

export const Contacts: React.FC = () => {
  return (
    <div>
      <h1>Контакты</h1>
      <Link to={routesPaths.home}>На главную</Link>
    </div>
  );
};
