import styles from "./variant2.module.css";
interface Variant2Props {
  index: string;
  title: string;
  image: string;
  left_image: string;
  text: string;
  accented_text: string;
}

function Variant2(props: Variant2Props) {
  return (
    <div className={styles.content}>
      <img
        className={`${styles.image}  ${styles.leftImage}`}
        src={props.left_image}
        alt="image"
      />
      <div className={styles.text}>
        <div
          className={styles.textContent}
          dangerouslySetInnerHTML={{ __html: props.text }}
        />
        <img
            className={`${styles.image}  ${styles.rightImage}`}
            src={props.image}
            alt="image"
          />
      </div>
    </div>
  );
}

export default Variant2;
