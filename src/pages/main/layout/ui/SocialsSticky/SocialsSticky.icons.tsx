import type { ReactNode } from "react";
import { EmailIcon } from "./icons/email";
import { FacebookIcon } from "./icons/facebook";
import { InstagramIcon } from "./icons/instagram";
import { LinkedinIcon } from "./icons/linkedin";
import { TelegramIcon } from "./icons/telegram";
import type { SocialType } from "./SocialsSticky.types";

export const SOCIAL_ICONS: Record<SocialType, ReactNode> = {
  Telegram: <TelegramIcon />,
  Instagram: <InstagramIcon />,
  Facebook: <FacebookIcon />,
  LinkedIn: <LinkedinIcon />,
  Email: <EmailIcon />,
};
