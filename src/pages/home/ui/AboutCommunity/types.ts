export interface AboutPreview {
  title: string;
  text: string;
  image: string;

  action_button: {
    label: string;
    link: string;
  };
}

export interface AboutCommunityProps {
  aboutPreview: AboutPreview;
}
