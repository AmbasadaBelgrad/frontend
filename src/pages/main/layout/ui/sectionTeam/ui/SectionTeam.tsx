import styles from "./SectionTeam.module.css"
import CardCarousel from "../cardCarousel/cardCarousel";
import { useEffect, useState } from "react";
import { apiClient } from "@shared/api/client.ts";

const SectionTeam = () => {

  const [data, setData] = useState<any>(null);
  
    useEffect(() => {
      apiClient
        .get("/api/v1/home")
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  return (
    <div>
      <h2>{data.team_preview.title}</h2>
      <CardCarousel cards={data.team_preview.members}></CardCarousel>
      <button>{data.team_preview.action_button}</button>
    </div>
  )
}

export default SectionTeam;