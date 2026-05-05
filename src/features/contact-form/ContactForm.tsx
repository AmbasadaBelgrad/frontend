import { 
  useState, 
  useEffect, 
  type ChangeEvent, 
  type FormEvent 
} from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContactForm.module.css";
import type {
  TContactFormPayload,
  TFormErrors,
} from "./model/types";

type TContactFormProps = {
  id: string;
  onSubmit?: (payload: TContactFormPayload) => void | Promise<void>;
  onValidityChange?: (isValid: boolean) => void;
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

const ContactForm = ({ id, onSubmit, onValidityChange }: TContactFormProps) => {
  const { t } = useTranslation("common");

  const [values, setValues] = useState<TContactFormPayload>(initialValues);
  const [errors, setErrors] = useState<TFormErrors>({});

  const isFormValid =
  values.name.trim().length > 0 &&
  EMAIL_REGEXP.test(values.email.trim()) &&
  values.message.trim().length > 0 &&
  values.contact_preference.trim().length === 0;

  useEffect(() => {
    onValidityChange?.(isFormValid);
  }, [isFormValid, onValidityChange]);


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

    if (!email) {
      nextErrors.email = t("contactForm.errors.requiredEmail");
    } else if (!EMAIL_REGEXP.test(email)) {
      nextErrors.email = t("contactForm.errors.invalidEmail");
    }

    if (!message) {
      nextErrors.message = t("contactForm.errors.requiredMessage");
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.contact_preference.trim()) {
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const payload: TContactFormPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      contact_preference: values.contact_preference,
    };

    await onSubmit?.(payload);
  };

  return (
    <form
      id={id}
      className={styles.contactForm}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.contactFormField}>
        <label className={styles.visuallyHidden} htmlFor="contact-name">
          {t("contactForm.fields.name")}
        </label>

        <input
          id="contact-name"
          className={styles.contactFormInput}
          name="name"
          type="text"
          value={values.name}
          placeholder={t("contactForm.fields.name")}
          maxLength={FIELD_LIMITS.name}
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onChange={handleChange}
        />

        {errors.name && (
          <span
            id="contact-name-error"
            className={styles.contactFormError}
            role="alert"
          >
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.contactFormField}>
        <label className={styles.visuallyHidden} htmlFor="contact-email">
          {t("contactForm.fields.email")}
        </label>

        <input
          id="contact-email"
          className={styles.contactFormInput}
          name="email"
          type="email"
          value={values.email}
          placeholder={t("contactForm.fields.email")}
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          onChange={handleChange}
        />

        {errors.email && (
          <span
            id="contact-email-error"
            className={styles.contactFormError}
            role="alert"
          >
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.contactFormField}>
        <label className={styles.visuallyHidden} htmlFor="contact-message">
          {t("contactForm.fields.message")}
        </label>

        <textarea
          id="contact-message"
          className={styles.contactFormTextarea}
          name="message"
          value={values.message}
          placeholder={t("contactForm.fields.message")}
          maxLength={FIELD_LIMITS.message}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          onChange={handleChange}
        />

        {errors.message && (
          <span
            id="contact-message-error"
            className={styles.contactFormError}
            role="alert"
          >
            {errors.message}
          </span>
        )}
      </div>

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
    </form>
  );
};

export default ContactForm;