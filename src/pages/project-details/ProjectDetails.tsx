import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useTranslation } from "react-i18next";
//import { MainInfo } from "@pages/project-details/ui/MainInfo/";
//import { InfoBlock } from "@pages/project-details/ui/InfoBlock/";
import styles from "./ProjectDetails.module.css";

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [deviceType, setDeviceType] = useState("desktop"); // 'mobile', 'tablet', 'desktop'
  const { t } = useTranslation("common");

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 833) {
        setDeviceType("mobile");
      } else if (width >= 834 && width < 1440) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <ul className={styles.pathList}>
          <li className={styles.pathItem}>
            <Link
              className={styles.pathText}
              aria-label={t("projectDetails.mainPage")}
              to={routesPaths.home}
            >
              {t("projectDetails.mainPage")}
            </Link>
          </li>
          <li className={styles.pathItem}>
            <Link
              className={styles.pathText}
              aria-label={t("projectDetails.catalogProject")}
              to={routesPaths.projects}
            >
              {!isMobile && t("projectDetails.catalogProject")}
              {isMobile && "..."}
            </Link>
          </li>
          <li className={styles.pathItem}>
            <span className={styles.pathText}>{slug}</span>
          </li>
        </ul>
        <Link
          className={`${!isMobile ? "btn btn--primary" : ""} ${styles.button}`}
          aria-label={t("projectDetails.textButtonDesktop")}
          to={routesPaths.projects}
        >
          {!isTablet && !isMobile && t("projectDetails.textButtonDesktop")}
          {isTablet && !isMobile && t("projectDetails.textButtonTablet")}
          {isMobile && (
            <img src="/back_arrow.svg" alt="arrow" className={styles.arrow} />
          )}
        </Link>
      </div>
      <div className={styles.content}>
        {/* main info */}
        {/* block info */}
      </div>
    </div>
  );
};
