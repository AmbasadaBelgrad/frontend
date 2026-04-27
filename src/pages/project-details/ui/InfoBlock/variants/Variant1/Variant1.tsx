import styles from "./variant1.module.css";
interface Variant1Props {
  index: string;
  title: string;
  image: string;
  string_list: string[];
  text: string;
  accented_text: string;
}

function Variant1(props: Variant1Props) {
  return (
    <div className={styles.content}>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
      <div className={styles.imageAndList}>
        <img className={styles.image} src={props.image} alt="image" />
        <ul className={styles.list}>
          {props.string_list.map((item, index) => (
            <li key={index} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: props.accented_text }}
      />
    </div>
  );
}

export default Variant1;
