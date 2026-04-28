export type Language = {
  code: string;
  label: string;
};

export type Social = {
  type: string;
  url: string;
};

export type LegalLink = {
  label: string;
  url: string;
};

export type InitResponse = {
  site_name: string;
  seo_description?: string;
  languages: Language[];
  socials: Social[];
  copyright: string;
  legal_links: LegalLink[];
};
