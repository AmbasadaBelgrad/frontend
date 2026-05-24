import styles from "./AboutCommunity.module.css";

export const AboutCommunity = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-community-title"
    >

      {/* =========================
          DESKTOP LAYOUT
          ========================= */}
      <div className={styles.desktopLayout}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>О сообществе</h2>

            <p className={styles.text}>
              Объединяя усилия для улучшения Белграда, мы создаем
              городскую среду, в которой приятно и безопасно находиться.
              Присоединяйтесь к сообществу урбанистов, меняющих город к лучшему
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
      </div>

      {/* =========================
          TABLET LAYOUT
          H2 → IMAGE → TEXT → BUTTON
          ========================= */}
      <div className={styles.tabletLayout}>
        <div className={styles.containerTablet}>

          <h2 className={styles.title}>О сообществе</h2>

          <div className={styles.imageWrapper}>
            <img
              src="image_aboutCommunity.jpg"
              alt="О сообществе"
              className={styles.image}
            />
          </div>

          <p className={styles.text}>
            Объединяя усилия для улучшения Белграда, мы создаем
            городскую среду, <br />в которой приятно и безопасно находиться.
            Присоединяйтесь<br /> к сообществу урбанистов, меняющих город к лучшему
          </p>

          <a href="/about" className={styles.button}>
            <span className={styles.buttonText}>
              Подробнее о сообществе
            </span>
          </a>

        </div>
      </div>

      {/* =========================
          MOBILE LAYOUT
          H2 → TEXT → IMAGE → BUTTON
          ========================= */}
      <div className={styles.mobileLayout}>
        <div className={styles.containerMobile}>

          <h2 className={styles.title}>О сообществе</h2>

          <p className={styles.text}>
            Объединяя усилия для улучшения Белграда, мы создаем
            городскую среду, в которой приятно и безопасно находиться.
            Присоединяйтесь к сообществу<br /> урбанистов, улучшающих город.
          </p>

          <div className={styles.imageWrapper}>
            <img
              src="image_aboutCommunity.jpg"
              alt="О сообществе"
              className={styles.image}
            />
          </div>

          <a href="/about" className={styles.button}>
            <span className={styles.buttonText}>
              Подробнее
            </span>
          </a>

        </div>
      </div>

    </section>
  );
};
