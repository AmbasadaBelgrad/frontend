export type TContactFormContent = {
  consent: {
    text_before_link: string;
    link_label: string;
    text_after_link: string;
    link: string;
  };
  submit_button: {
    label: string;
  };
};

export type TContactFormPayload = {
  name: string;
  email: string;
  message: string;
  contact_preference: string;
};

export type TFormErrors = {
  name?: string;
  email?: string;
  message?: string;
};
