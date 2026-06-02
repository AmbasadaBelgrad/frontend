import React from "react";
import { Link } from "react-router-dom";
import styles from "./SectionHero.module.css";
import type { Hero} from "@/entities/home/model/types";

type HeroProps = {
  hero: Hero;
}

export const SectionHero: React.FC<HeroProps> = ({ hero }) => {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.left_column}>
          <h1 className={styles.title}>{hero.title}</h1>
          <div className={styles.squares} aria-hidden="true">
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <div key={i} className={styles.square} />
              ))}
          </div>
          <div className={styles.image_wrapper_left}>
            <img
              src={hero.image_left}
              alt={hero.title}
              className={styles.image_left}
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.right_column}>
          <div className={styles.image_wrapper_right}>
            <img
              src={hero.image_right}
              alt={hero.title}
              className={styles.image_right}
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
      </div>
    </section>
  );
};
