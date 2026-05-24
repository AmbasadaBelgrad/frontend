import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { apiClient } from "@shared/api/client";
import { SectionTeam } from "./sectionTeam/index";
import type { TeamPreview } from "./sectionTeam/ui/type";

type HomeResponse = {
  team_preview: TeamPreview;
};

export const Home: React.FC = () => {
  const [homeResponse, setHomeResponse] = useState<HomeResponse | null>(null);

  useEffect(() => {
    apiClient
      .get<HomeResponse>("/api/v1/home")
      .then((response) => {
        setHomeResponse(response);
      })
      .catch((error) => {
        console.error("Error fetching home:", error);
      });
  }, []);

  if (!homeResponse) {
    return <div>Loading...</div>;
  }
  //  React.useEffect(() => {
  //     async function getHome() {
  //       try {
  //         const res = await apiClient.get<HomeResponse>("/home");
  
  //         setHomeResponse(res);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     getHome();
  //   }, []);
  
  //   if (!homeResponse) {
  //     return null;
  //   }
  

  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
      <SectionTeam teamPreview={homeResponse.team_preview}></SectionTeam>
    </div>
  );
};
