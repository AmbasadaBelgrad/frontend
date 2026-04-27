/*
import { InfoBlock } from "../../pages/project-details/ui/InfoBlock";
import type { IInfoBlock } from "../../pages/project-details/ui/InfoBlock";

 const DatainfoBlock: IInfoBlock[] = [
    {
      variant: 1,
      index: "001",
      title: "Исследование",
      image: "./images/maps_var1.png",
      string_list: [
        "поведение посетителей и типы активности",
        "неформальные тропы и паттерны передвижения по парку",
        "рельеф и его влияние на использование пространства",
        "места встреч, зоны отдыха и «места силы»",
        "недостатки среды и точки напряжения",
        "роль парка в жизни местных жителей и города в целом",
      ],
      text: "<p>Мы рассматриваем <strong>Звездарский лес</strong> как живую среду, а не как абстрактную территорию. Исследование фокусируется на повседневных сценариях, маршрутах, точках притяжения и взаимодействии людей, природы и парковой инфраструктуры. В рамках проекта мы проанализировали:</p>",
      accented_text:
        "<p>Результатом исследования стала <strong>визуально-аналитическая база</strong> — карты, диаграммы, наблюдения и выводы, — которая помогает лучше понять, как Звездарский лес функционирует сегодня и какие изменения могут сделать его более комфортным, безопасным и живым</p>",
    },
    {
      variant: 2,
      index: "002",
      title: "Навигация и брендинг",
      image: "./images/2_var2.png",
      left_image: "./images/1_var2.png",
      text: "<p>Проект навигации и брендинга <strong>Звездарского леса</strong> является продолжением исследовательской работы и основан на реальном опыте людей, которые ежедневно пользуются парком. В ходе исследования была выявлена одна из ключевых проблем — практически полное отсутствие навигации, из-за чего затруднены ориентация, использование маршрутов и доступ к важным точкам внутри парка.</p><p>В этом проекте брендинг рассматривается не только как визуальный инструмент, но и как <strong>способ заботы о парке</strong> и его <strong>сохранении</strong>. Чёткая навигация и единый визуальный язык помогают направлять потоки посетителей, снижать хаотичное движение и формировать более бережное отношение к территории.</p><p>Проект навигации и брендинга усиливает связь между людьми и <strong>пространством</strong>, поддерживает безопасность и способствует уважительному отношению к парку как к важной части городской среды.</p>",
      accented_text:
        "<p><strong>Цель проекта</strong> — сделать парк более понятным, доступным и дружелюбным, не нарушая его природный характер и существующую экосистему</p>",
    },
    {
      variant: 3,
      index: "003",
      title: "Концепция",
      image: "./images/1_var3.png",
      text: "<p>В рамках проекта архитекторы разработали концепцию зонирования и использования <strong>Звездарского леса</strong>, основанную на бережном и уважительном отношении к природной среде.</p><p>Активности в парке организованы через небольшие, пространственно разнесённые зоны, что предотвращает концентрацию потоков посетителей и позволяет взаимодействовать с лесом через тактильные и сенсорные впечатления с использованием <strong>натуральных материалов</strong>.</p><p>Передвижение по территории организовано с помощью наземных троп и деревянных настилов, которые не нарушают почву и помогают сохранить естественный рельеф. Освещение спроектировано как <strong>экологичное и ненавязчивое</strong> — оно поддерживает безопасность в вечернее время, не нанося вреда окружающей среде.</p>",
      accented_text:
        "<p><strong>Главная цель концепции</strong> — создать условия для отдыха и использования территории при сохранении экосистемы и естественных процессов леса.</p><p><strong>Ключевой принцип концепции</strong> — сохранение существующих границ парка без расширения в лесные зоны. Вмешательство в природную среду сведено к минимуму, а часть леса сохраняется полностью нетронутой — без застройки и благоустройства.</p>",
      buttons: [
        {
          label: "Скачать материалы проекта",
          type: "download",
          url: "https://cdn.example.com/materials.pdf", 
        },
        {
          label: "Youtube Урбанфеста",
          type: "redirect",
          url: "https://youtube.com/urbanfest",
        },
      ],
    },
  ];

  <InfoBlock key={item.index} {...item} />
  */

import { useState } from "react";
import styles from "./infoBlock.module.css";
import { Variant1, Variant2, Variant3 } from "./variants";

type Tbutton = {
  label: string;
  type: "download" | "redirect";
  url: string;
};

interface IInfoBlock {
  variant: 1 | 2 | 3;
  index: string;
  title: string;
  image: string;
  left_image?: string;
  string_list?: string[];
  text: string;
  accented_text: string;
  buttons?: Tbutton[];
}

function InfoBlock(props: IInfoBlock) {
  const [hideContent, setHideContent] = useState(false);

  const toggleContent = () => {
    setHideContent(!hideContent);
  };

  const renderContent = () => {
    switch (props.variant) {
      case 1:
        return (
          <Variant1
            index={props.index}
            title={props.title}
            image={props.image}
            string_list={props.string_list || []}
            text={props.text}
            accented_text={props.accented_text}
          />
        );
      case 2:
        return (
          <Variant2
            index={props.index}
            title={props.title}
            image={props.image}
            left_image={props.left_image || ""}
            text={props.text}
            accented_text={props.accented_text}
          />
        );
      case 3:
        return (
          <Variant3
            index={props.index}
            title={props.title}
            image={props.image}
            text={props.text}
            accented_text={props.accented_text}
            buttons={props.buttons || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.containerVariant}>
      <div className={styles.title}>
        <span className={styles.index}>{props.index}</span>
        <h4 className={styles.titleText}>{props.title}</h4>
        <button className={styles.button} onClick={toggleContent}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: hideContent ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path
              d="M5 15L12 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 8L19 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {!hideContent && <div className={styles.content}>{renderContent()}</div>}
    </div>
  );
}

export default InfoBlock;
export type { IInfoBlock, Tbutton };
