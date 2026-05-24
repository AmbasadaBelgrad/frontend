import styles from "./AboutCommunity.module.css";

export const AboutCommunity = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-community-title"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2
            id="about-community-title"
            className={styles.title}
          >
            О сообществе
          </h2>

          <p className={styles.text}>
            Объединяя усилия для улучшения Белграда, мы создаем
            городскую среду, в которой приятно и безопасно
            находиться. Присоединяйтесь к сообществу урбанистов,
            меняющих город к лучшему.
          </p>

          <a href="/about" className={styles.button}>
            <span className={styles.buttonText}>
              Подробнее о сообществе
            </span>
          </a>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src="image_aboutCommunity.jpg"
            alt="О сообществе"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};
