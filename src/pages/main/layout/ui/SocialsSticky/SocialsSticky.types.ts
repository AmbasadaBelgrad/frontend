export type SocialType =
  | "Telegram"
  | "Instagram"
  | "Facebook"
  | "Linkedin"
  | "Email";

export interface SocialItem {
  type: SocialType;
  url: string;
}

export interface SocialsStickyProps {
  socials: SocialItem[];
}
