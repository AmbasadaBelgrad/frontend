export type Language = {
  code: string;
  label: string;
};

export type InitData = {
  site_name: string;
  languages: Language[];
};

export type HeaderProps = {
  data: InitData | null;
};
