import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/features/contact-form";
import type { TContactFormPayload } from "@/features/contact-form/model/types";
import { useTranslation } from "react-i18next";
import { routesPaths } from "@/shared/config/routesPaths.ts";
import styles from "./ContactSection.module.css";

export type TContactSectionProps = {
  text_before_link: string;
  link_label: string;
  text_after_link: string;
};

const CONTACT_FORM_ID = "contact-form";

const ContactSection = (props: TContactSectionProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { t } = useTranslation("common");

  const handleSubmit = async (formPayload: TContactFormPayload) => {
    if (formPayload.contact_preference) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      setIsSuccessModalOpen(true);
      // TODO: отправить данные на сервер
    } catch (error) {
      setSubmitError("Не удалось отправить форму. Попробуйте еще раз.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactSectionDecor} aria-hidden="true">
        <span className={styles.contactSectionDecorGreen} />
        <span className={styles.contactSectionDecorPurple} />
      </div>

      <h2 className={styles.contactSectionTitle}>{t("contactForm.title")}</h2>

      <div className={styles.contactSectionBody}>
        <div className={styles.contactSectionContent}>
          <img
            className={styles.contactSectionImage}
            src="/images/ContactFormImage.png"
            alt={t("contactForm.title")}
            loading="lazy"
          />
        </div>

        <div className={styles.contactSectionFormWrapper}>
          <p className={styles.contactSectionDescription}>
            {t("contactForm.text")}
          </p>

          <ContactForm
            id={CONTACT_FORM_ID}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onValidityChange={setIsContactFormValid}
          />

          <p className={styles.contactSectionConsent}>
            {props.text_before_link}{" "}
            <Link className="linkForm" to={routesPaths.policy}>
              {props.link_label}
            </Link>{" "}
            {props.text_after_link}
          </p>

          {submitError && (
            <p className={styles.contactSectionSubmitError} role="alert">
              {submitError}
            </p>
          )}
        </div>
      </div>

      <div className={styles.contactSectionSubmitWrapper}>
        <button
          className={`btn btn--primary ${styles.contactSectionSubmit}`}
          type="submit"
          form={CONTACT_FORM_ID}
          disabled={!isContactFormValid || isSubmitting}
        >
          {isSubmitting
            ? `{t("contactForm.title")} + "..."`
            : `{t("contactForm.title")}`}
        </button>
      </div>

      {isSuccessModalOpen && <div>{/* SuccessModal */}</div>}
    </section>
  );
};

export default ContactSection;
