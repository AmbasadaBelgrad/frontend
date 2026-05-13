// import { Outlet } from "react-router-dom";
// import { useInitQuery, useInitSeo } from "@/entities/init";
// import styles from "./MainLayout.module.css";
// import { Header } from "./ui/header";

// // компонент будет оборачивать все маршруты в роутере
// const MainLayout = () => {
//   const {
//     data: initData,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useInitQuery();

//   useInitSeo(initData);

//   if (isLoading) {
//     return (
//       <div className={styles.appState}>
//         <p>Загрузка сайта...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className={styles.appState}>
//         <p>Не удалось загрузить данные сайта</p>

//         {error instanceof Error && (
//           <p className={styles.errorText}>{error.message}</p>
//         )}

//         <button
//           className={`btn btn--primary ${styles.button}`}
//           type="button"
//           onClick={() => void refetch()}
//           disabled={isFetching}
//         >
//           Повторить запрос
//         </button>
//       </div>
//     );
//   }

//   if (!initData) {
//     return (
//       <div className={styles.appState}>
//         <p>Инициализация приложения...</p>

//         <p className={styles.errorText}>
//           Загружаем базовые данные сайта. Если состояние не меняется — обновите
//           страницу.
//         </p>

//         <button
//           className={`btn btn--primary ${styles.button}`}
//           type="button"
//           onClick={() => window.location.reload()}
//         >
//           Обновить страницу
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.layout}>
//       {/* TODO: передать initData в Header, когда компонент будет готов */}
//       <Header data = {initData}></Header>
//       <main className={styles.main}>
//         <div className={styles.mainInner}>
//           <Outlet /> {/* Здесь подставляется содержимое страниц */}
//         </div>
//       </main>
//       {/* TODO: передать initData в Footer, когда компонент будет готов */}
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default MainLayout;
import styles from "./MainLayout.module.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { apiClient } from "@shared/api/client.ts";
import { Header } from "./ui/header";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
  const { i18n } = useTranslation();

  const [homeResponse, setHomeResponse] = useState<any>(null);
  const [initResponse, setInitResponse] = useState<any>(null);

  useEffect(() => {
    const lang = i18n.language;

    apiClient
      .get("/api/v1/init", {
        headers: { "Accept-Language": lang },
      })
      .then((response) => {
        setInitResponse(response);
      })
      .catch((error) => {
        console.error("Error fetching init:", error);
      });

    apiClient
      .get("/api/v1/home", {
        headers: { "Accept-Language": lang },
      })
      .then((response) => {
        setHomeResponse(response);
      })
      .catch((error) => {
        console.error("Error fetching home:", error);
      });
  }, [i18n.language]);

  return (
  <div className={styles.layout}>
    <Header data={initResponse ?? null} />

    <main className={styles.main}>
      <div className={styles.mainInner}>
        <Outlet />
      </div>
    </main>

    {homeResponse?.data && (
      <pre>{JSON.stringify(homeResponse.data, null, 2)}</pre>
    )}
  </div>
);
};

export default MainLayout;