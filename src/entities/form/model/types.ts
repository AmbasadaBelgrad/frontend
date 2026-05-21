export interface contactFormGetResponse {
  donation_text: string;
  social_link: [
    {
      social_type: string;
      url: string;
      order: number;
    },
  ];
}

export interface contactFormPost {
  name: string;
  email: string;
  message: string;
  reason: string;
  contact_preference: string;
}

export interface contactFormPostResponse {
  detail: string;
}
