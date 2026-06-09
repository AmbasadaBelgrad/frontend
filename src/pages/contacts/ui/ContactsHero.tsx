// FIX: добавлен импорт Link для хлебных крошек
import { Link } from "react-router-dom";
import styles from "./ContactsHero.module.css";
import type { ContactsHeroProps } from "./types";

export const ContactsHero = ({
  phone,
  address,
  socials,
}: ContactsHeroProps) => {
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
      <div
        className={styles.backgroundShape}
        aria-hidden="true"
      />

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

          <li aria-current="page">
            Связаться с нами
          </li>
        </ul>
      </nav>

      {/* Контент поверх всего */}
      <div className={styles.info}>
        <h1 className={styles.title}>
          Свяжитесь с нами любым удобным образом
        </h1>

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
              <li
                key={social.id}
                className={styles.socialItem}
              >
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactBlock}>
          <h2 className={styles.subtitle}>
            Приехать в офис
          </h2>

          <address className={styles.address}>
            {address}
          </address>
        </div>
      </div>
    </section>
  );
};
