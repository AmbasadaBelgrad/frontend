import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

import { FooterNav } from "./FooterNav";
import { FooterSocials } from "./FooterSocials";
import { FooterLegalLinks } from "./FooterLegalLinks";
import { FooterCopyright } from "./FooterCopyright";

type Props = {
  data: {
    socials?: Record<string, string>;
    legal_links?: Record<string, string>;
    copyright?: string;
  } | null;
  loading: boolean;
};

export const Footer = ({ data, loading }: Props) => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>

        {/* TOP ROW */}
        <div className={styles.topRow}>

          <div className={styles.logo}>
            <a href="/" aria-label={t("footer.aria.home")}>
              <img
                src="/logo.svg"
                alt={t("footer.site_name")}
                className={styles.logoImage}
              />
            </a>
          </div>

          <div className={styles.rightBlock}>
            <FooterNav />

            <FooterSocials
              socials={data?.socials}
              loading={loading}
            />
          </div>

        </div>

        <div className={styles.bottomRow}>
          <FooterCopyright
            copyright={data?.copyright}
            loading={loading}
          />

          <FooterLegalLinks
            legalLinks={data?.legal_links}
            loading={loading}
          />
        </div>

      </div>
    </footer>
  );
};
