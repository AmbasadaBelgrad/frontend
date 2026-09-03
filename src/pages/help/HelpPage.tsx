import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routesPaths } from "@shared/config/routesPaths";
import styles from "./HelpPage.module.css";

export const HelpPage = () => {
  const { t } = useTranslation("common");

  return (
    <main className={styles.page}>
      <nav
        aria-label={t("navigation.breadcrumbs", "Breadcrumbs")}
        className={styles.breadcrumbs}
      >
        <Link to={routesPaths.home} className={styles.breadcrumbLink}>
          {t("navigation.home", "Home")}
        </Link>
        <span className={styles.breadcrumbSeparator} aria-hidden="true">
          /
        </span>
        <span className={styles.breadcrumbCurrent} aria-current="page">
          {t("header.menu.help")}
        </span>
      </nav>

      <section className={styles.card}>
        <div className={styles.visual}>
          <img
            src="/images/ips-qr-aleksei-radchenko-500-rsd.png"
            alt={t("help.qrAlt")}
            className={styles.qrImage}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <p className={styles.kicker}>{t("header.menu.help")}</p>
          <h1 className={styles.title}>{t("help.title")}</h1>
          <p className={styles.description}>{t("help.description")}</p>
        </div>
      </section>
    </main>
  );
};

export default HelpPage;
