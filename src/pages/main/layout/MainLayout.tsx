import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useEffect, useState } from "react";
import { apiClient } from "@shared/api/client.ts";

// компонент будет оборачивать все маршруты в роутере
const MainLayout = () => {
  // example for request, need to add types - it is not a production version!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    apiClient
      .get("/api/v1/home")
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles.layout}>
      {/* <Header /> */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <Outlet /> {/* Здесь подставляется содержимое страниц */}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
