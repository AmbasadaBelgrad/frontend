import type { Social } from "@/entities/init/model/types";

export type FooterData = {
  site_name?: string;

  socials?: Social[];

  legal_links?: Record<string, string>;

  copyright?: string;
};

