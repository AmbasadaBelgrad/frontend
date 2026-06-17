export const useEmail = (url: string, type: string) => {
  const isEmail = type?.toLowerCase() === "email";

  return {
    href: isEmail ? `mailto:${url}` : url,
    target: isEmail ? undefined : "_blank",
    rel: isEmail ? undefined : "noopener noreferrer",
  };
};
