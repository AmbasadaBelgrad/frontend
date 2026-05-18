import React from "react";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import { useTranslation } from "react-i18next";
import { MainInfo } from "./ui/MainInfo/";
import { InfoBlock } from "./ui/InfoBlock/";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { useProjectDetailsQuery } from "@entities/project-details/";
import styles from "./ProjectDetails.module.css";

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error } = useProjectDetailsQuery(slug!);
  const device = useViewportWidth();
  const { t } = useTranslation("common");
  const isMobile = device.isMobile;
  const isTablet = device.isTablet;
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error("ProjectDetails Error:", error);
      navigate(routesPaths.projects);
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return (
      <div className={styles.appState}>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!data || isError) {
    return null;
  }

  const mainInfo = {
    picture: data.info.image,
    title: data.info.title,
    description: data.info.description,
    tags: data.info.tags,
  };

  const dataInfoBlock = {
    content_blocks: data.content_blocks,
  };

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
            <span className={styles.pathText}>{data.info.title}</span>
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
        <MainInfo {...mainInfo} />
        <div className={styles.infoBlock}>
          {dataInfoBlock.content_blocks.map((item) => (
            <InfoBlock {...item} key={item.index} />
          ))}
        </div>
      </div>
    </div>
  );
};
