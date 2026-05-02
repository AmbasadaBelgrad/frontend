import React from "react";
import styles from "./OurValues.module.css";
import type { IOurValuesProps } from "./type";

export const OurValues = ({ data }: IOurValuesProps) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const getOrderGradient = (index: number) => {
    if (isMobile) {
      return index % 2 === 0 ? styles.purple : styles.green;
    }

    const rowIndex = Math.floor(index / 2);
    const isRightColumn = index % 2 === 1;

    if (rowIndex % 2 === 0) {
      return isRightColumn ? styles.green : styles.purple;
    } else {
      return isRightColumn ? styles.purple : styles.green;
    }
  };

  return (
    <section className={styles.our_values_section}>
      <h2 className={styles.title}>{data.title}</h2>
      <ul className={styles.items_list}>
        {data.items.map((item, index) => (
          <li key={item.id} className={getOrderGradient(index)}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
