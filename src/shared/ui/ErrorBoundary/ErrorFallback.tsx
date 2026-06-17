import { useTranslation } from "react-i18next";
import FenceSVG from "../Fence";

import styles from "./ErrorBoundary.module.css";
import type { ErrorFallbackProps } from "./ErrorBoundary.types";

export const ErrorFallback = ({ resetError }: ErrorFallbackProps) => {
  const { t } = useTranslation("common");

  const handleBack = (): void => {
    window.history.back();
  };

  const handleReset = (): void => {
    if (resetError) {
      resetError();
    }
  };

  return (
    <div className={styles.errorContainer}>
      <div className={styles.fenceWrapper}>
        <FenceSVG />
      </div>

      <div className={styles.textContent}>
        <h2 className={styles.errorTitle}>{t("errorBoundary.title")}</h2>
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleReset}
          className={`btn btn--secondary ${styles.resetButton}`}
          type="button"
        >
          {t("errorBoundary.resetButtonText")}
        </button>
        <button
          onClick={handleBack}
          className={`btn btn--primary ${styles.backButton}`}
          type="button"
        >
          {t("errorBoundary.buttonText")}
        </button>
      </div>
    </div>
  );
};
