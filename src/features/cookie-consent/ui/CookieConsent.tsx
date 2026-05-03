import React from "react";
import { useCookieConsent } from "../model/useCookieConsent";
import styles from "./CookieConsent.module.css";

export const CookieConsent: React.FC = () => {
  const { isVisible, accept } = useCookieConsent();

  if (!isVisible) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookies"
    >
      <div className={styles.container}>
        <p className={styles.text}>
          Мы используем cookies для быстрой и удобной работы сайта. Продолжая
          использование сайта, вы соглашаетесь с этим.
        </p>

        <button
          className={`btn btn--primary ${styles.button}`}
          onClick={accept}
          aria-label="Принять cookies"
        >
          Ок
        </button>
      </div>
    </div>
  );
};
