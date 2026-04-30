export type TContactSectionData = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type TContactSectionProps = {
  data: TContactSectionData;
};
