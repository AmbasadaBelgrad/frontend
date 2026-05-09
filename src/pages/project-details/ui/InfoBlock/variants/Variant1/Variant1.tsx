import { insertImgList } from "./insertPicList";
import styles from "./variant1.module.css";
interface Variant1Props {
  image?: string;
  string_list?: string[];
  text?: string;
  accented_text?: string;
  mobileMode: boolean;
}

function Variant1(props: Variant1Props) {
  const data = insertImgList(
    props.mobileMode,
    props.text || "",
    props.accented_text || "",
    props.image,
    styles.image,
    styles.accentedText,
    props.string_list || [],
    styles.imageAndList,
    styles.list,
    styles.listItems,
  );

  return (
    <>
      {data && (
        <div
          className={styles.textContent}
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )}
    </>
  );
}

export default Variant1;
