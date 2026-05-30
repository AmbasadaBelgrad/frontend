// import React from "react";
// import styles from "./Home.module.css";
// import { useHomeQuery } from "@/entities/home/model/useHomeQuery";
// import { Link } from "react-router-dom";
// import { routesPaths } from "@shared/config/routesPaths";
// import { SectionHero } from "./ui/section-hero/index";


// export const Home: React.FC = () => {
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useHomeQuery();

//   if (isLoading) {
//     return <div>Загрузка...</div>;
//   }

//   if (isError) {
//     return (
//       <div>
//         {error instanceof Error
//           ? error.message
//           : "Ошибка загрузки"}
//       </div>
//     );
//   }

//   if (!data) return null;

//   return (
//     <div className={styles.mainContainer}>
//       <h1>Главная страница</h1>

//       <Link to={routesPaths.projects}>
//         Проекты
//       </Link>
//       <SectionHero hero={data.hero}/>
//       {/* AboutSection */}
//       {/* TeamSection */}
//       {/* ProjectsSection */}
//       {/* ContactSection */}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { apiClient } from "@shared/api/client";
import { SectionHero } from "./ui/section-hero";
import type { Hero } from "./ui/section-hero/type";

type HomeResponse = {
  hero: Hero;
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
      <SectionHero hero={homeResponse.hero}></SectionHero>
    </div>
  );
};


