import React from "react";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths.ts";
import ContactSection from "@/widgets/contact-section/ui/ContactSection.tsx";
import type { TContactSectionProps } from "@/widgets/contact-section/ui/ContactSection.tsx";

export const Home: React.FC = () => {
  const contactSectionProps: TContactSectionProps = {
    sectionData: {
      title: "Свяжитесь с нами",
      description: "Оставьте заявку, и мы ответим на все ваши вопросы",
      image: {
        src: "https://image.fonwall.ru/o/ql/unicorn-the-white-unicorn-mythical-creature.jpeg?auto=compress&fit=resize&w=1200&h=686&display=large&domain=img3.fonwall.ru",
        alt: "Свяжитесь с нами",
      },
    },
    contactData: {
      consent: {
        text_before_link: "Нажимая на кнопку, вы соглашаетесь с",
        link_label: "политикой обработки персональных данных",
        text_after_link: "",
        link: "/privacy-policy",
      },
      submit_button: {
        label: "Отправить",
      },
    },
    imageLoading: "lazy",
    imageFetchPriority: "auto",
  };

  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={routesPaths.projects}>Проекты</Link>
      <ContactSection {...contactSectionProps} />
    </div>
  );
};
