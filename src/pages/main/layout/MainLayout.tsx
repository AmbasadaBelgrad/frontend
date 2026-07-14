import { useInitQuery, useInitSeo } from "@/entities/init";
import { InitDataContext } from "@/shared/context/InitDataContext";
import { CookieConsent } from "@/features/cookie-consent/ui/CookieConsent";
import { Outlet } from "react-router-dom";
import { Header } from "./ui/header";
import { Footer } from "./ui/footer/index";
import { SocialsSticky } from "./ui/SocialsSticky";
import type { SocialItem, SocialType } from "./ui/SocialsSticky";
import type { Social } from "@/entities/init/";
import styles from "./MainLayout.module.css";

const convertToSocialItem = (social: Social): SocialItem | null => {
  const validTypes: SocialType[] = [
    "Telegram",
    "Instagram",
    "Facebook",
    "LinkedIn",
    "Email",
  ];

  if (validTypes.includes(social.social_type as SocialType)) {
    return {
      type: social.social_type as SocialType,
      url: social.url,
    };
  }

  return null;
};

const MainLayout = () => {
  const {
    data: initData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useInitQuery();

  useInitSeo(initData);

  const socialsForSticky: SocialItem[] =
    initData?.socials
      .map(convertToSocialItem)
      .filter((item): item is SocialItem => item !== null) ?? [];

  if (isLoading) {
    return (
      <div className={styles.appState}>
        <p>Загрузка сайта...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.appState}>
        <p>Не удалось загрузить данные сайта</p>

        {error instanceof Error && (
          <p className={styles.errorText}>{error.message}</p>
        )}

        <button
          className={`btn btn--primary ${styles.button}`}
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          Повторить запрос
        </button>
      </div>
    );
  }

  if (!initData) {
    return (
      <div className={styles.appState}>
        <p>Инициализация приложения...</p>

        <p className={styles.errorText}>
          Загружаем базовые данные сайта. Если состояние не меняется — обновите
          страницу.
        </p>

        <button
          className={`btn btn--primary ${styles.button}`}
          type="button"
          onClick={() => window.location.reload()}
        >
          Обновить страницу
        </button>
      </div>
    );
  }

  return (
    <InitDataContext.Provider value={initData}>
      <div className={styles.layout}>
        {/* TODO: передать initData в Header, когда компонент будет готов */}
        <Header data={initData}></Header>
        <main className={styles.main}>
          <div className={styles.mainInner}>
            <Outlet /> {/* Здесь подставляется содержимое страниц */}
          </div>
        </main>
        <CookieConsent
          text={initData.cookie_message}
          confirmButtonText={initData.cookie_button_text}
        />
        <SocialsSticky socials={socialsForSticky} />
        <Footer data={initData} />
      </div>
    </InitDataContext.Provider>
  );
};

export default MainLayout;
