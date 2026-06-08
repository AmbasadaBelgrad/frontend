import styles from "./FooterSocials.module.css";
import type { Social } from "@/entities/init/model/types";

type Props = {
  socials?: Social[];
};

export const FooterSocials = ({ socials }: Props) => {
  if (!socials?.length) {
    return null;
  }

  return (
    <div className={styles.socials}>
      {socials.map((social) => (
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          aria-label={social.social_type}
        >
          <img
            src={`/icons_socials/${social.social_type.toLowerCase()}.svg`}
            alt={social.social_type}
            className={styles.icon}
          />
        </a>
      ))}
    </div>
  );
};
