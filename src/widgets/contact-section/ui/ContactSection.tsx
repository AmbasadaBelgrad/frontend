import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/features/contact-form";
import type { TContactSection } from "../model/types";
import type {
  TContactData,
  TContactFormPayload,
} from "@/features/contact-form/model/types";
import styles from "./ContactSection.module.css";

type TContactSectionProps = {
  sectionData: TContactSection;
  payload: TContactData;
  imageLoading?: "lazy" | "eager";
  imageFetchPriority?: "auto" | "high" | "low";
};

const CONTACT_FORM_ID = "contact-form";

const ContactSection = ({
  sectionData,
  payload,
  imageLoading = "lazy",
  imageFetchPriority = "auto",
}: TContactSectionProps) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isContactFormValid, setIsContactFormValid] = useState(false);

  const handleSubmit = async (formPayload: TContactFormPayload) => {
    if (formPayload.contact_preference) {
      return;
    }

    // отправка на API
    // await sendContactRequest(formPayload);

    setIsSuccessModalOpen(true);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactSectionDecor} aria-hidden="true">
        <span className={styles.contactSectionDecorGreen} />
        <span className={styles.contactSectionDecorPurpleSmall} />
        <span className={styles.contactSectionDecorPurpleLarge} />
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
            onSubmit={handleSubmit}
            onValidityChange={setIsContactFormValid}
            />

          <p className={styles.contactSectionConsent}>
            {payload.consent.text_before_link}{" "}
            <Link className="linkForm" to={payload.consent.link}>
              {payload.consent.link_label}
            </Link>{" "}
            {payload.consent.text_after_link}
          </p>
        </div>
      </div>

      <div className={styles.contactSectionSubmitWrapper}>
        <button
          className={`btn btn--primary ${styles.contactSectionSubmit}`}
          type="submit"
          form={CONTACT_FORM_ID}
          disabled={!isContactFormValid}
        >
          {payload.submit_button.label}
        </button>
      </div>

      {isSuccessModalOpen && (
        <div>
          {/* SuccessModal */}
        </div>
      )}
    </section>
  );
};

export default ContactSection;