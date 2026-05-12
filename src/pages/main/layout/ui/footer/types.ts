export type FooterData = {
  site_name?: string;
  
  socials?: {
    linkedin?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };

  legal_links?: Record<string, string>;

  copyright?: string;
};
