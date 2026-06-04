import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { Link } from "react-router-dom";
import type { ProjectsPreview } from "@/entities/home/model/types";
import styles from "./SectionProjects.module.css";

type ProjectProps = {
  projects_preview: ProjectsPreview;
};

export const SectionProjects: React.FC<ProjectProps> = ({
  projects_preview,
}) => {
  const { isMobile, isTablet } = useViewportWidth();

  let visibleProjects = 4;

  if (isMobile) {
    visibleProjects = 1;
  } else if (isTablet) {
    visibleProjects = 3;
  }

  const isHeroCard = !isMobile;

  const projects = projects_preview.items.slice(0, visibleProjects);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{projects_preview.title}</h2>

      <ul className={styles.grid}>
        {projects.map((project, index) => {
          const isFirstHero = index === 0 && isHeroCard;

          return (
            <li
              key={project.id}
              className={`${styles.card} ${
                isFirstHero ? styles.card_first : styles.card_usual
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className={
                  isFirstHero ? styles.image_first : styles.image_usual
                }
                loading="lazy"
              />

              <div
                className={
                  isFirstHero ? styles.content_first : styles.content_usual
                }
              >
                <div
                  className={
                    isFirstHero
                      ? styles.content_container_first
                      : styles.content_container_usual
                  }
                >
                  {isFirstHero && (
                    <ul className={styles.tags}>
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className={styles.tag}>{tag}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <h3
                    className={
                      isFirstHero ? styles.title_first : styles.title_usual
                    }
                  >
                    {project.title}
                  </h3>

                  <p
                    className={
                      isFirstHero
                        ? styles.description_first
                        : styles.description_usual
                    }
                  >
                    {project.description}
                  </p>

                  {project.action_button && (
                    <Link
                      to={project.action_button.link.replace(
                        "{id}",
                        project.id,
                      )}
                      className={
                        isFirstHero
                          ? `btn btn--primary ${styles.button_project_first}`
                          : styles.button_project
                      }
                      aria-label={project.action_button.label}
                    >
                      {!isFirstHero && (
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
          );
        })}
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
