import React from "react";
import { Link } from "react-router-dom";
import type { ProjectProps } from "./type";
import styles from "./SectionProjects.module.css";

export const SectionProjects: React.FC<ProjectProps> = ({
  projects_preview,
}) => {
  console.log(projects_preview);
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{projects_preview.title}</h2>
      <ul className={styles.grid}>
        {projects_preview.items.map((project) => (
          <li
            key={project.id}
            className={`${styles.card} ${project.isFirst ? styles.card_first : styles.card_usual}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className={`${project.isFirst ? styles.image_first : styles.image_usual}`}
              loading="lazy"
            />
            {project.action_button && (
              <div className={styles.line_diagonal}>
                <svg
                  width="322"
                  height="540"
                  viewBox="0 0 322 540"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.73248 540H8.01286C1.84099 540 -2.00629 533.307 1.09985 527.974L306.281 3.97381C307.714 1.51337 310.347 0 313.194 0H313.706C319.872 0 323.72 6.68097 320.626 12.0143L16.6524 536.014C15.2212 538.481 12.5847 540 9.73248 540Z"
                    fill="#CBF287"
                    fill-opacity="0.5"
                  />
                </svg>
              </div>
            )}
            <div
              className={`${project.isFirst ? styles.content_first : styles.content_usual}`}
            >
              <div
                className={`${project.isFirst ? styles.content_container_first : ""}`}
              >
                {project.isFirst && (
                  <ul className={styles.tags}>
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <span className={styles.tag}>{tag}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <h3
                  className={`${project.isFirst ? styles.title_first : styles.title_usual}`}
                >
                  {project.title}
                </h3>
                <p
                  className={`${project.isFirst ? styles.description_first : styles.description_usual}`}
                >
                  {project.description}
                </p>
                {project.action_button && (
                  <Link
                    to={project.action_button.link.replace("{id}", project.id)}
                    className={`
    ${project.isFirst ? `btn btn--primary ${styles.button_project_first}` : `${styles.button_project}`}
  `}
                    aria-label={project.action_button.label}
                  >
                    {!project.isFirst && (
                      <img
                        src="/button for cards.svg"
                        alt=""
                        className={styles.icon}
                      />
                    )}

                    <span className={styles.buttonText}>
                      {project.action_button.label}
                    </span>
                  </Link>
                )}
              </div>
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
  );
};
