import { Link } from "react-router-dom";
import styles from "./ContactsHero.module.css";
import type { ContactsHeroProps } from "./types";
import { useEffect, useState } from "react";

export const ContactsHero = ({
  phone,
  address,
  socials,
}: ContactsHeroProps) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsTablet(window.innerWidth <= 835);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const title = isTablet
    ? "Свяжитесь любым удобным образом"
    : "Свяжитесь с нами любым удобным образом";

  return (
    <section className={styles.hero}>
      {/* Фон-карта (самый нижний слой) */}
      <div className={styles.mapWrapper}>
        <img
          src="/mapImage.png"
          alt="Расположение офиса"
          className={styles.map}
        />
      </div>

      {/* Цветной слой поверх карты */}
      <div className={styles.backgroundShape} aria-hidden="true" />

      {/* Хлебные крошки */}
      <nav aria-label="Хлебные крошки" className={styles.breadcrumbsWrapper}>
        <ul className={styles.breadcrumbs}>
          <li>
            <Link to="/" className={styles.breadcrumbLink}>
              Главная
            </Link>
          </li>

          <li aria-hidden="true" className={styles.breadcrumbSeparator}>
            &gt;
          </li>

          <li aria-current="page">Связаться с нами</li>
        </ul>
      </nav>

      {/* Контент */}
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>Позвонить</h2>

          <a href={`tel:${phone}`} className={styles.link}>
            {phone}
          </a>
        </div>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>Написать</h2>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.id} className={styles.socialItem}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <img
                    src={`/icons_socials/${social.id.toLowerCase()}.svg`}
                    alt=""
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>Приехать в офис</h2>

          <address className={styles.address}>{address}</address>
        </div>
      </div>
    </section>
  );
};
