import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useEffect, useState } from "react";
import { apiClient } from "@shared/api/client.ts";
import { Header } from "./ui/header";
import { useTranslation } from "react-i18next";

// компонент будет оборачивать все маршруты в роутере
const MainLayout = () => {
  const { i18n } = useTranslation();
  // example for request, need to add types - it is not a production version!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [initData, setInitData] = useState<any>(null);
  useEffect(() => {
    const lang = i18n.language;

    apiClient
      .get("/api/v1/init", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setInitData(response);
      })
      .catch((error) => {
        console.error("Error fetching init:", error);
      });

    apiClient
      .get("/api/v1/home", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching home:", error);
      });
  }, [i18n.language]);


  return (
    <div className={styles.layout}>
      <Header data={initData}></Header>
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <Outlet /> {/* Здесь подставляется содержимое страниц */}
        </div>
      </main>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
