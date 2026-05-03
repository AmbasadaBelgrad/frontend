import styles from "./FooterCopyright.module.css";

type Props = {
  copyright?: string;
};

export const FooterCopyright = ({ copyright }: Props) => {
  if (!copyright) return null;

  return (
    <div className={styles.copyright}>
      {copyright}
    </div>
  );
};
