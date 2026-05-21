import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/features/contact-form";
import type { TContactSection } from "../model/types";
import type {
  TContactData,
  TContactFormPayload,
} from "@/features/contact-form/model/types";
import styles from "./ContactSection.module.css";

export type TContactSectionProps = {
  sectionData: TContactSection;
  contactData: TContactData;
  imageLoading?: "lazy" | "eager";
  imageFetchPriority?: "auto" | "high" | "low";
};

const CONTACT_FORM_ID = "contact-form";

const ContactSection = ({
  sectionData,
  contactData,
  imageLoading = "lazy",
  imageFetchPriority = "auto",
}: TContactSectionProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

      <h2 className={styles.contactSectionTitle}>{sectionData.title}</h2>

      <div className={styles.contactSectionBody}>
        <div className={styles.contactSectionContent}>
          <img
            className={styles.contactSectionImage}
            src={sectionData.image.src}
            alt={sectionData.image.alt}
            loading={imageLoading}
            fetchPriority={imageFetchPriority}
          />
        </div>

        <div className={styles.contactSectionFormWrapper}>
          <p className={styles.contactSectionDescription}>
            {sectionData.description}
          </p>

          <ContactForm
            id={CONTACT_FORM_ID}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onValidityChange={setIsContactFormValid}
          />

          <p className={styles.contactSectionConsent}>
            {contactData.consent.text_before_link}{" "}
            <Link className="linkForm" to={contactData.consent.link}>
              {contactData.consent.link_label}
            </Link>{" "}
            {contactData.consent.text_after_link}
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
          {isSubmitting ? "Отправляем..." : contactData.submit_button.label}
        </button>
      </div>

      {isSuccessModalOpen && <div>{/* SuccessModal */}</div>}
    </section>
  );
};

export default ContactSection;
