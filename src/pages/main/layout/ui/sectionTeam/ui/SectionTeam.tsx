import styles from "./SectionTeam.module.css"
import CardCarousel from "../cardCarousel/cardCarousel";
import { useEffect, useState } from "react";
import { apiClient } from "@shared/api/client.ts";

const SectionTeam = () => {

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
      <h2>{data?.team_preview.title}</h2>
      <CardCarousel cards={data?.team_preview.members}></CardCarousel>
      <button onClick={data?.team_preview.action_button.link} className={styles.button}>{data?.team_preview.action_button.label}</button>
    </div>
  )
}

export default SectionTeam;

