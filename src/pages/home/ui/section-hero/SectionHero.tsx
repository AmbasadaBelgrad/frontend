import React from "react";
import { Link } from "react-router-dom";
import type { HeroProps } from "./type";
import styles from "./SectionHero.module.css";

export const SectionHero: React.FC<HeroProps> = ({ hero }) => {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <h1 className={styles.title}>{hero.title}</h1>
        <div className={styles.image_wrapper_right}>
          <img
            src={hero.image_right}
            alt={hero.title}
            className={styles.image_right}
            loading="lazy"
          />
        </div>
        <div className={styles.image_wrapper_left}>
          <img
            src={hero.image_left}
            alt={hero.title}
            className={styles.image_left}
            loading="lazy"
          />
        </div>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <Link
          to={hero.action_button.link}
          className={`btn btn--primary ${styles.button}`}
          aria-label={hero.action_button.label}
        >
          {hero.action_button.label}
        </Link>
      </div>
    </section>
  );
};
