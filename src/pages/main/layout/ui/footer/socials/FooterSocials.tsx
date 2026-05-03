import styles from "./FooterSocials.module.css";

type Props = {
  socials?: {
    linkedin?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };
};

export const FooterSocials = ({ socials }: Props) => {
  const isEmpty = !socials || Object.values(socials).every((v) => !v);

  return (
    <div className={styles.socials}>
      {isEmpty && (
        <span style={{ opacity: 0.5 }}>No socials available</span>
      )}

      {socials?.linkedin && (
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img
            src="/icons_socials/linkedin.svg"
            alt="LinkedIn"
            className={styles.icon}
          />
        </a>
      )}

      {socials?.telegram && (
        <a
          href={socials.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
        >
          <img
            src="/icons_socials/telegram.svg"
            alt="Telegram"
            className={styles.icon}
          />
        </a>
      )}

      {socials?.instagram && (
        <a
          href={socials.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <img
            src="/icons_socials/instagram.svg"
            alt="Instagram"
            className={styles.icon}
          />
        </a>
      )}

      {socials?.facebook && (
        <a
          href={socials.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <img
            src="/icons_socials/facebook.svg"
            alt="Facebook"
            className={styles.icon}
          />
        </a>
      )}

      {socials?.email && (
        <a href={`mailto:${socials.email}`} aria-label="Email">
          <img
            src="/icons_socials/email.svg"
            alt="Email"
            className={styles.icon}
          />
        </a>
      )}
    </div>
  );
};
