import type { SocialsStickyProps } from "./SocialsSticky.types";
import { SOCIAL_LABELS } from "./SocialsSticky.constants";
import { SOCIAL_ICONS } from "./SocialsSticky.icons";
import styles from "./SocialsSticky.module.css";
import { useEmail } from "@/shared/lib/useEmail";

export const SocialsSticky = ({ socials }: SocialsStickyProps) => {
  if (!socials?.length) return null;

  return (
    <aside className={styles.wrapper} aria-label="Социальные сети">
      <ul className={styles.list}>
        {socials.map((item) => {
          const linkProps = useEmail(item.url, item.type);

          return (
            <li key={item.type} className={styles.item}>
              <a
                aria-label={SOCIAL_LABELS[item.type]}
                className={styles.link}
                {...linkProps}
              >
                <span className={styles.icon}>{SOCIAL_ICONS[item.type]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
