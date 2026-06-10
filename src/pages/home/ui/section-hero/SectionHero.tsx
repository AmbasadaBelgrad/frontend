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
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>{hero.title}</h1>
          <div className={styles.squares} aria-hidden="true">
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <div key={i} className={styles.square} />
              ))}
          </div>
          <div className={styles.imageWrapperLeft}>
            <img
              src={hero.image_left}
              alt={hero.title}
              className={styles.imageLeft}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.imageWrapperRight}>
            <img
              src={hero.image_right}
              alt={hero.title}
              className={styles.imageRight}
              loading="eager"
              fetchPriority="high"
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
