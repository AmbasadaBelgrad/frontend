import React from "react";
import { Link } from "react-router-dom";
import type {ProjectProps} from "./type";
import styles from "./SectionProjects.module.css";

export const SectionProjects: React.FC<ProjectProps> = ({
  projects_preview,
}) => {
  return(
    <section className={styles.container}>
      <h2>{projects_preview.title}</h2>
      <ul className={styles.grid}>
        {projects_preview.items.map((project) => (
          <li key={project.id} className={styles.card}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
              loading="lazy"
            />

            <div className={styles.content}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>

              <Link
                to={project.action_button.link.replace("{id}", project.id)}
                className={styles.button_project}
                aria-label={project.action_button.label}
              >
                <img
                  src="/button for cards.svg"
                  alt=""
                  className={styles.icon}
                />
                <span className={styles.buttonText}>
                  {project.action_button.label}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link
          to={projects_preview.action_button.link}
          className={`btn btn--primary ${styles.button}`}
          aria-label={projects_preview.action_button.label}
        >
          {projects_preview.action_button.label}
      </Link>
    </section>
  )
}