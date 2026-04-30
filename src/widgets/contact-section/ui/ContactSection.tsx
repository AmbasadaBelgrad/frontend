import type { TContactSectionData } from "../model/types";
import styles from "./ContactSection.module.css";

type TContactSectionProps = {
  data: TContactSectionData;
};

const ContactSection = ({ data }: TContactSectionProps) => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactSectionContent}>
        <h2 className={styles.contactSectionTitle}>{data.title}</h2>
        <img
          className={styles.contactSectionImage}
          src={data.image.src}
          alt={data.image.alt}
          loading="lazy"
        />
        <p className={styles.contactSectionDescription}>{data.description}</p>
      </div>
    </section>
  );
};

export default ContactSection;
// общая сетка, декоративные элементы, адаптив
// заголовок
// текст пояснение
// картинка редактируемая
// форма
// текст с политикой (ссылка)

// (весь текст и картинка с бека)
