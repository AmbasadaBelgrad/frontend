import styles from "./variant3.module.css";
import type { Tbutton } from "../../InfoBlock";

interface Variant3Props {
  index: string;
  title: string;
  image: string;
  text: string;
  accented_text: string;
  buttons: Tbutton[];
}

function Variant3(props: Variant3Props) {
  return (
    <div className={styles.content}>
      <div
        className={styles.textContent}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
      <div className={styles.imageAndAccentedText}>
        <img className={styles.image} src={props.image} alt="image" />
        <div
          className={styles.accentedText}
          dangerouslySetInnerHTML={{ __html: props.accented_text }}
        />
      </div>

      <div
        className={styles.textContent}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />

      <ul className={styles.buttonsList}>
        {props.buttons.map((item, index) => (
          <li key={index} className={styles.buttonItem}>
            <button className={`${styles.button} btn btn--primary`}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Variant3;
