import { useState, type ChangeEvent } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./ContactForm.module.css";
import type {
  TContactFormContent,
  TContactFormPayload,
  TFormErrors,
} from "../model/types";

type TContactFormProps = {
  data: TContactFormContent;
  onSubmit?: (formData: TContactFormPayload) => void | Promise<void>;
};

const initialValues: TContactFormPayload = {
  name: "",
  email: "",
  message: "",
  contact_preference: "",
};

const FIELD_LIMITS = {
  name: 30,
  message: 1000,
} as const;

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ data, onSubmit }: TContactFormProps) => {
  const { t } = useTranslation();

  const [values, setValues] = useState<TContactFormPayload>(initialValues);
  const [errors, setErrors] = useState<TFormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    let nextValue = value;

    if (name === "name") {
      nextValue = value.slice(0, FIELD_LIMITS.name);
    }

    if (name === "message") {
      nextValue = value.slice(0, FIELD_LIMITS.message);
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: nextValue,
    }));
  };

  const validateForm = () => {
    const nextErrors: TFormErrors = {};

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!name) {
      nextErrors.name = t("contactForm.errors.requiredName");
    }

    if (email && !EMAIL_REGEXP.test(email)) {
      nextErrors.email = t("contactForm.errors.invalidEmail");
    }

    if (!message) {
      nextErrors.message = t("contactForm.errors.requiredMessage");
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const formData: TContactFormPayload = {
      name: values.name,
      email: values.email,
      message: values.message,
      contact_preference: values.contact_preference,
    };

    void onSubmit?.(formData);
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      <label className={styles.contactFormField}>
        <span className={styles.contactFormLabel}>
          {t("contactForm.fields.name")}
        </span>
        <input
          className={styles.contactFormInput}
          name="name"
          type="text"
          value={values.name}
          maxLength={FIELD_LIMITS.name}
          aria-invalid={Boolean(errors.name)}
          onChange={handleChange}
        />

        {errors.name && (
          <span className={styles.contactFormError}>{errors.name}</span>
        )}
      </label>

      <label className={styles.contactFormField}>
        <span className={styles.contactFormLabel}>
          {t("contactForm.fields.email")}
        </span>

        <input
          className={styles.contactFormInput}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
        />

        {errors.email && (
          <span className={styles.contactFormError}>{errors.email}</span>
        )}
      </label>

      <label className={styles.contactFormField}>
        <span className={styles.contactFormLabel}>
          {t("contactForm.fields.message")}
        </span>

        <textarea
          className={styles.contactFormTextarea}
          name="message"
          value={values.message}
          maxLength={FIELD_LIMITS.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
        />

        {errors.message && (
          <span className={styles.contactFormError}>{errors.message}</span>
        )}
      </label>

      <label className={styles.contactFormHoneypot} aria-hidden="true">
        <span>Contact preference</span>

        <input
          name="contact_preference"
          type="text"
          value={values.contact_preference}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <p className={styles.contactFormConsent}>
        {data.consent.text_before_link}{" "}
        <Link className="linkForm" to={data.consent.link}>
          {data.consent.link_label}
        </Link>{" "}
        {data.consent.text_after_link}
      </p>

      <button
        className={`btn btn--primary ${styles.contactFormSubmit}`}
        type="submit"
      >
        {data.submit_button.label}
      </button>
    </form>
  );
};

export default ContactForm;

// запрос POST/contact
// модалка успеха
// модалка с допустимыми символами?
