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

  const handleButtonClick = (item: Tbutton) => {
    if (item.type === "download") {
      fetch(item.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;

          const filename =
            item.url.split("/").pop() || `download_${Date.now()}`;
          link.download = filename;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла:", error);
          alert("Не удалось загрузить файл. Пожалуйста, попробуйте позже.");
        });
    } else if (item.type === "redirect") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

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
              <button
                className={`${styles.button} btn btn--primary`}
                onClick={() => handleButtonClick(item)}
              >
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
