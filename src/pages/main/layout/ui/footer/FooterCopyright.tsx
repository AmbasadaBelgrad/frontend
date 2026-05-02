import styles from "./FooterCopyright.module.css";

type Props = {
  copyright?: string;
  loading: boolean;
};

export const FooterCopyright = ({ copyright, loading }: Props) => {
  if (loading) {
    return <div className={styles.copyright}>Loading...</div>;
  }

  if (!copyright) return null;

  return <div className={styles.copyright}>{copyright}</div>;
};
