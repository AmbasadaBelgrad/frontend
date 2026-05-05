import styles from "./variant3.module.css";
import type { Tbutton } from "../../InfoBlock";
import { insertAfterFirstParagraph } from "./insertParagraph";

interface Variant3Props {
  image?: string;
  text?: string;
  accented_text?: string;
  buttons?: Tbutton[];
  mobileMode: boolean;
}

function Variant3(props: Variant3Props) {
  const text = insertAfterFirstParagraph(
    props.mobileMode,
    props.text || "",
    props.accented_text,
    props.image,
    styles.image,
    styles.accentedText,
  );

  return (
    <div className={styles.content}>
      {text && (
        <div
          className={styles.textContent}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {props.buttons && props.buttons.length > 0 && (
        <ul className={styles.buttonsList}>
          {props.buttons.map((item, index) => (
            <li key={index} className={styles.buttonItem}>
              <button className={`${styles.button} btn btn--primary`}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Variant3;
