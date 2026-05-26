import type { AboutData } from "@/pages/about/ui/about-us-section";
import type { ValuesData } from "@/pages/about/ui/our-values";
import type { TeamData } from "@/pages/about/ui/our-team";
import type { TCarousel } from "@/pages/about/ui/our-gallery";

export type AboutPageResponse = {
  about_section: AboutData;
  values: ValuesData;
  team: TeamData;
  gallery_carousel: TCarousel;
};
