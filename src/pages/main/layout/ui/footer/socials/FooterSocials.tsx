import styles from "./FooterSocials.module.css";
import type { Social } from "@/entities/init/model/types";
import { getLinkProps } from "@/shared/lib/getLinkProps";

type Props = {
  socials?: Social[];
};

export const FooterSocials = ({ socials }: Props) => {
  if (!socials?.length) return null;

  return (
    <div className={styles.socials}>
      {socials.map((social) => {
        const linkProps = getLinkProps(social.url, social.social_type);

        return (
          <a key={social.url} aria-label={social.social_type} {...linkProps}>
            <img
              src={`/icons_socials/${social.social_type.toLowerCase()}.svg`}
              alt={social.social_type || "icon"}
              className={styles.icon}
            />
          </a>
        );
      })}
    </div>
  );
};
