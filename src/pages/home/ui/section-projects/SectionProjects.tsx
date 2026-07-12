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

  const projects = projects_preview.items.slice(0, visibleProjects);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{projects_preview.title}</h2>

      <ul className={styles.grid}>
        {projects.map((project, index) => {
          const isFirstHero = index === 0 && !isMobile;

          return (
            <li
              key={project.id}
              className={`${styles.card} ${
                isFirstHero ? styles.cardFirst : styles.cardUsual
              }`}
            >
              <div
                className={
                  isFirstHero
                    ? styles.imageWrapperFirst
                    : styles.imageWrapperUsual
                }
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={
                    isFirstHero ? styles.imageFirst : styles.imageUsual
                  }
                  loading="lazy"
                />
              </div>

              <div
                className={
                  isFirstHero ? styles.contentFirst : styles.contentUsual
                }
              >
                <div
                  className={
                    isFirstHero
                      ? styles.contentContainerFirst
                      : styles.contentContainerUsual
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
                      isFirstHero ? styles.titleFirst : styles.titleUsual
                    }
                  >
                    {project.title}
                  </h3>

                  <p
                    className={
                      isFirstHero
                        ? styles.descriptionFirst
                        : styles.descriptionUsual
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
                          ? `btn btn--primary ${styles.buttonProjectFirst}`
                          : styles.buttonProject
                      }
                      aria-label={project.action_button.label}
                    >
                      {!isFirstHero && <div className={styles.arrowButton} />}

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
