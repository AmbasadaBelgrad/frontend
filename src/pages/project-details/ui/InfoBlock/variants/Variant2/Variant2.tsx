import styles from "./variant2.module.css";
import { insertPicTextBlock } from "./insertVar2";

interface Variant2Props {
  image?: string;
  left_image?: string;
  text?: string;
  accented_text?: string;
  mobileMode: boolean;
}

function Variant2(props: Variant2Props) {
  const data = insertPicTextBlock(
    props.mobileMode,
    props.text || "",
    props.accented_text || "",
    props.image,
    props.left_image,
    styles.imageRight,
    styles.accentedText,
    styles.imageLeft,
    styles.textContent,   
    styles.rightImageWrapper
  );

  return (
    <>
      {data && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )}
    </>
  );
}

export default Variant2;
