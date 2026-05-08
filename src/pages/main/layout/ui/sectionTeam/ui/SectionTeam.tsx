import styles from "./SectionTeam.module.css";
import { useNavigate } from "react-router-dom";
import CardCarousel from "../cardCarousel/cardCarousel";
import type { TeamPreview } from "./type";

interface SectionTeamProps {
  teamPreview: TeamPreview;
}

const SectionTeam: React.FC<SectionTeamProps> = ({ teamPreview }) => {
  
const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.tittle}>{teamPreview.title}</h2>
      <CardCarousel cards={teamPreview.members}></CardCarousel>
      <div className={styles.button_container}>
      <button
        onClick={() => navigate(teamPreview.action_button?.link ?? "/")}
        className={styles.button}
      >
        {teamPreview.action_button?.label}
      </button>
      </div>
       </div>
  )
}

export default SectionTeam;

