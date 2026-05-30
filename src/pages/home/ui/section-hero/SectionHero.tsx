import React from "react";
import { Link } from "react-router-dom";
import type { HeroProps } from "./type";
import styles from "./SectionHero.module.css";

export const SectionHero: React.FC<HeroProps> = ({ hero }) => {
  return (
    <section className={styles.container}>
      <h1>{hero.title}</h1>
      <img
        src={hero.image_left}
        alt={hero.title}
        className={styles.image_left}
        loading="lazy"
      />
      <img
        src={hero.image_right}
        alt={hero.title}
        className={styles.image_right}
        loading="lazy"
      />
      <Link
        to={hero.action_button.link}
        className={`btn btn--primary ${styles.button}`}
        aria-label={hero.action_button.label}
      >
        {hero.action_button.label}
      </Link>
    </section>
  );
};
