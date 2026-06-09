import type { ReactNode } from "react";

export interface ContactSocial {
  id: string;
  href: string;
  label: string;
  icon: ReactNode;
}

export interface ContactsHeroProps {
  phone: string;
  address: string;
  socials: ContactSocial[];
}
