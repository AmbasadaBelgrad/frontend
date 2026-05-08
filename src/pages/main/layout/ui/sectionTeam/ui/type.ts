export type Member = {
  name: string;
  role: string;
  photo: string;
}

export type ActionButton = {
  label: string;
  link: string;
};

export type SectionTeamProps = {
  team_preview: {
        title: string;
        members: Member[];
        action_button: ActionButton;
      }
};