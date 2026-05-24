export interface Project {
  id: string;
  title: string;
  description: string;
  project_type: string;
  tags: string[];
  year: string;
  image: string;
  isFirst: boolean;
  action_button: ActionButton;
}

export interface ActionButton {
  label: string;
  link: string;
}

export interface ProjectsPreview {
  title: string;
  items: Project[];
  action_button: ActionButton;
}

export type ProjectProps = {
  projects_preview: ProjectsPreview;
}