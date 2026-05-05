import styles from "./variant2.module.css";

interface Variant2Props {
  image?: string;
  left_image?: string;
  text?: string;
  accented_text?: string;
  mobileMode: boolean;
}

function Variant2(props: Variant2Props) {
  return (
    <div className={styles.content}>
      <img src={props.left_image} className={styles.imageLeft} alt="" />
      <div className={styles.textContent}>
        <p>
          Проект навигации и брендинга <strong>Звездарского леса</strong>{" "}
          является продолжением исследовательской работы и основан на реальном
          опыте людей, которые ежедневно пользуются парком. В ходе исследования
          была выявлена одна из ключевых проблем — практически полное отсутствие
          навигации, из-за чего затруднены ориентация, использование маршрутов и
          доступ к важным точкам внутри парка.
        </p>

        <div className={styles.accentedText}>
          <p>
            <strong>Цель проекта</strong> — сделать парк более понятным,
            доступным и дружелюбным, не нарушая его природный характер и
            существующую экосистему
          </p>
        </div>
        <div className={styles.rightImageWrapper}>
          <div className={styles.textBeforeImage}>
            <p>
              В этом проекте брендинг рассматривается не только как визуальный
              инструмент, но и как <strong>способ заботы о парке</strong> и его{" "}
              <strong>сохранении</strong>. Чёткая навигация и единый визуальный язык
              помогают направлять потоки посетителей, снижать хаотичное движение и
              формировать более бережное отношение к территории.
            </p>
          </div>
          <div className={styles.imageFloatWrapper}>
            <img src={props.image} className={styles.imageRight} alt="" />
            <div className={styles.textAfterImage}>
              <p>
                Проект навигации и брендинга усиливает связь между людьми и{" "}
                <strong>пространством</strong>, поддерживает безопасность и
                способствует уважительному отношению к парку как к важной части
                городской среды.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Variant2;