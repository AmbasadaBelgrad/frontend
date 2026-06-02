import { useTranslation } from "react-i18next";
import FenceSVG from "../Fence";

import styles from "./ErrorBoundary.module.css";

export const ErrorFallback = () => {
  const { t } = useTranslation("common");
  const handleBack = (): void => {
    window.history.back();
  };

  return (
    <>
      <div className={styles.errorContainer}>
        <div className={styles.fenceWrapper}>
          <FenceSVG />
        </div>

        <div className={styles.textContent}>
          <h2 className={styles.errorTitle}>{t("errorBoundary.title")}</h2>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleBack}
            className={`btn btn--primary ${styles.backButton}`}
            type="button"
          >
            {t("errorBoundary.buttonText")}
          </button>
        </div>
      </div>
    </>
  );
};
