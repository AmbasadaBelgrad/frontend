import { ContactForm } from "@/features/contact-form/ui/form/ui";
import type { TContactSection } from "../model/types";
import type { TContactFormContent } from "@/features/contact-form/ui/form/model/types";
import styles from "./ContactSection.module.css";

type TContactSectionProps = {
  sectionData: TContactSection;
  formData: TContactFormContent;
  imageLoading?: "lazy" | "eager";
  imageFetchPriority?: "auto" | "high" | "low";
};

const ContactSection = ({
  sectionData,
  formData,
  imageLoading = "lazy",
  imageFetchPriority = "auto",
}: TContactSectionProps) => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactSectionContent}>
        <h2 className={styles.contactSectionTitle}>{sectionData.title}</h2>

        <img
          className={styles.contactSectionImage}
          src={sectionData.image.src}
          alt={sectionData.image.alt}
          loading={imageLoading}
          fetchPriority={imageFetchPriority}
        />

        <p className={styles.contactSectionDescription}>
          {sectionData.description}
        </p>
      </div>

      <ContactForm data={formData} />
    </section>
  );
};

export default ContactSection;
// общая сетка, декоративные элементы, адаптив
// заголовок
// текст пояснение
// картинка редактируемая
// форма

// (весь текст и картинка с бека)
