import CloseSVG from "../CloseSvg";
import styles from "./ErrorBoundary.module.css";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ErrorModal = ({ isOpen, onClose }: ErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalCloseButtonWrapper}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            <CloseSVG />
          </button>
        </div>

        <div className={styles.modalWrapper}>
          <h3 className={styles.modalTitle}>Спасибо!</h3>

          <p className={styles.modalText}>
            Мы получили сообщение и проверим проблему.
            <span className={styles.secondaryText}>
              {" "}
              Команда свяжется с Вами при необходимости.
            </span>
          </p>

          <div className={styles.buttonWrapper}>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
