export type Member = {
  name: string;
  role: string;
  photo: string;
};

export type ActionButton = {
  label: string;
  link: string;
};

export type TeamPreview = {
  title: string;
  members: Member[];
  action_button: ActionButton;
};

export type HomeResponse = {
  team_preview: TeamPreview;
};