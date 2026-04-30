const CYRILLIC_SITE_NAME = "Амбасада за урбанизам";
const LATIN_SITE_NAME = "Ambasada za urbanizam";

export const getLocalizedSiteName = (
  language: string,
  fallbackSiteName: string,
): string => {
  if (language === "ru" || language === "sr-Cyrl") {
    return CYRILLIC_SITE_NAME;
  }

  if (language === "en" || language === "sr-Latn") {
    return LATIN_SITE_NAME;
  }

  return fallbackSiteName;
};
