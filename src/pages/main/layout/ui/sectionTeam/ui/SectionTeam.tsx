import styles from "./SectionTeam.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardCarousel from "../cardCarousel/cardCarousel";
import { apiClient } from "@/shared/api/client";
// import type {SectionTeamProps} from './type';

const SectionTeam = () => {
  
const navigate = useNavigate();
const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/api/v1/home")
      .then((response) => {
        console.log("Full response:", response);
        setData(response); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  if (loading ) {
    return(
      <div>Загрузка</div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.tittle}>{data.team_preview?.title}</h2>
      <CardCarousel cards={data?.team_preview?.members}></CardCarousel>
      <div className={styles.button_container}>
      <button
        onClick={() => navigate(data?.team_preview?.action_button?.link ?? "/")}
        className={styles.button}
      >
        {data?.team_preview?.action_button?.label}
      </button>
      </div>
       </div>
  )
}

export default SectionTeam;

