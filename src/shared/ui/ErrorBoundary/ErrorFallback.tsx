import type { ErrorInfo } from "react";
import { useState } from "react";

import FenceSVG from "../Fence";

import styles from "./ErrorBoundary.module.css";
import { ErrorModal } from "./ErrorModal";
import { logError } from "./useErrorLogger";

interface Props {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export const ErrorFallback = ({ error, errorInfo }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendReport = (): void => {
    logError(error, errorInfo);

    setIsModalOpen(true);
  };

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
          <h2 className={styles.errorTitle}>
            Что-то пошло не так. Кто-то уже поставил здесь забор.
          </h2>

          <p className={styles.reportLink}>
            Отправить отчет об ошибке?{" "}
            <button
              type="button"
              className={styles.reportButton}
              onClick={handleSendReport}
            >
              Отправить
            </button>
          </p>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleBack}
            className={`btn btn--primary ${styles.backButton}`}
            type="button"
          >
            Назад
          </button>
        </div>
      </div>

      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
