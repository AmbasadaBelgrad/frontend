import styles from "./SectionTeam.module.css";
import { Link } from "react-router-dom";
import CardCarousel from "./card-carousel/CardCarousel";
import type { TeamPreview } from "./type";

interface SectionTeamProps {
  teamPreview: TeamPreview;
}

export const SectionTeam: React.FC<SectionTeamProps> = ({ teamPreview }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{teamPreview.title}</h2>
      <CardCarousel cards={teamPreview.members}></CardCarousel>
      <div className={styles.buttonContainer}>
        <Link
          to={teamPreview.action_button.link}
          className={`btn btn--primary ${styles.button}`}
          aria-label={teamPreview.action_button.label}
        >
          {teamPreview.action_button.label}
        </Link>
      </div>
    </section>
  );
};
