import React from "react";
import { Link } from "react-router-dom";
import styles from "./SectionHero.module.css";
import type { Hero } from "@/entities/home/model/types";

type HeroProps = {
  hero: Hero;
};

export const SectionHero: React.FC<HeroProps> = ({ hero }) => {
  const [leftLoaded, setLeftLoaded] = React.useState(false);
  const [rightLoaded, setRightLoaded] = React.useState(false);

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{hero.title}</h1>
            <div className={styles.squares} aria-hidden="true">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className={styles.square} />
                ))}
            </div>
          </div>
          <div
            className={`${styles.imageWrapperLeft} ${leftLoaded ? styles.imageLoaded : ""}`}
          >
            <img
              src={hero.image_left}
              alt={hero.title}
              className={styles.imageLeft}
              loading="eager"
              fetchPriority="high"
              onLoad={() => setLeftLoaded(true)}
            />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div
            className={`${styles.imageWrapperRight} ${rightLoaded ? styles.imageLoaded : ""}`}
          >
            <img
              src={hero.image_right}
              alt={hero.title}
              className={styles.imageRight}
              loading="eager"
              fetchPriority="high"
              onLoad={() => setRightLoaded(true)}
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
