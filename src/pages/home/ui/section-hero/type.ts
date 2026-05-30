export interface ActionButton {
  label: string;
  link: string;
}

export interface Hero {
  title: string;
  image_left: string;
  image_right: string;
  action_button: ActionButton;
  link: string;
  
}

export type HeroProps = {
  hero: Hero;
}