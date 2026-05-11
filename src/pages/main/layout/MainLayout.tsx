import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useEffect, useState } from "react";
import { apiClient } from "@shared/api/client.ts";
import { Footer } from "./ui/footer/index";
import { useInit } from "@shared/api/useInit";
import type { FooterData } from "./ui/footer/types";
// компонент будет оборачивать все маршруты в роутере
const MainLayout = () => {
  // example for request, need to add types - it is not a production version!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [_data, setData] = useState<any>(null);

  const { data: initData, loading } = useInit();

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

  const footerData: FooterData | null = initData
    ? {
        socials: initData.socials,
        legal_links: initData.legal_links,
        copyright: initData.copyright,
      }
    : null;

  return (
    <div className={styles.layout}>
      {/* <Header /> */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <Outlet /> {/* Здесь подставляется содержимое страниц */}
        </div>
      </main>
      {!loading && <Footer data={footerData} />}
    </div>
  );
};

export default MainLayout;
