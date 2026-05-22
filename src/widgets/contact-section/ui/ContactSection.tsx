import { useState, useEffect } from "react";
import { useInitData } from "@shared/context/InitDataContext.tsx";
import { safeCode } from "@shared/lib/safeCode";
import { ContactForm } from "@/features/contact-form";
import type { TContactFormPayload } from "@/features/contact-form/model/types";
import { useTranslation } from "react-i18next";
import { usePostContact } from "@entities/form/index";
import styles from "./ContactSection.module.css";

export type TContactSectionProps = {
  text_before_link: string;
  link_label: string;
  text_after_link: string;
};

const CONTACT_FORM_ID = "contact-form";

const ContactSection = () => {
  const initData = useInitData();
  const politics = safeCode(initData?.privacy_policy || "");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { t } = useTranslation("common");
  const { mutate: postContact, isPending, isSuccess } = usePostContact();

  const handleSubmit = (formPayload: TContactFormPayload) => {
    if (formPayload.contact_preference) {
      return;
    }
    setSubmitError("");
    console.log("1. Отправка формы, данные:", formPayload);

    postContact(formPayload, {
      onSuccess: () => {
        console.log("2. onSuccess вызван!");
        setIsSuccessModalOpen(true);
        console.log("3. isSuccessModalOpen установлен в true");
      },
      onError: (error) => {
        console.log("2. onError вызван:", error);
        setSubmitError("Не удалось отправить форму. Попробуйте еще раз.");
        console.error("Submit error:", error);
      },
    });
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactSectionDecor} aria-hidden="true">
        <span className={styles.contactSectionDecorGreen} />
        <span className={styles.contactSectionDecorPurple} />
      </div>

      <h2 className={styles.contactSectionTitle}>
        {t("contactForm.fields.title")}
      </h2>

      <div className={styles.contactSectionBody}>
        <div className={styles.contactSectionContent}>
          <img
            className={styles.contactSectionImage}
            src="/images/contactFormImg.png"
            alt={t("contactForm.fields.title")}
            loading="lazy"
          />
        </div>

        <div className={styles.contactSectionFormWrapper}>
          <p className={styles.contactSectionDescription}>
            {t("contactForm.fields.text")}
          </p>

          <ContactForm
            id={CONTACT_FORM_ID}
            isSubmitting={isPending}
            onSubmit={handleSubmit}
            onValidityChange={setIsContactFormValid}
          />
          <div
            className={styles.policyContent}
            dangerouslySetInnerHTML={{ __html: politics }}
          />
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
          disabled={!isContactFormValid || isPending}
        >
          {isPending
            ? `${t("contactForm.fields.button_text")}...`
            : t("contactForm.fields.button_text")}
        </button>
      </div>

      {isSuccessModalOpen && <div>{/* SuccessModal */}</div>}
    </section>
  );
};

export default ContactSection;
