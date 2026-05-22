import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import styles from "./modal.module.css";

interface ModalProps {
  type: "success" | "error";
  onClose?: () => void;
}

const Modal = ({ type, onClose }: ModalProps) => {
  const { t } = useTranslation("common");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div ref={modalRef} className={styles.container}>
        <div className={styles.content}>
          <h3 className={styles.title}>
            {type === "success" && t("contactForm.successModal.title")}
            {type === "error" && t("contactForm.errorModal.title")}
          </h3>
          <p className={styles.text}>
            {type === "success" && t("contactForm.successModal.text")}
            {type === "error" && t("contactForm.errorModal.text")}
          </p>
        </div>
        <button
          onClick={handleButtonClick}
          className={`btn btn--primary ${styles.button}`}
        >
          {type === "success" && t("contactForm.successModal.button")}
          {type === "error" && t("contactForm.errorModal.button")}
        </button>
      </div>
    </div>
  );
};

export default Modal;
