const CYRILLIC_SITE_NAME = "Амбасада за урбанизам";
const LATIN_SITE_NAME = "Ambasada za urbanizam";

export const getLocalizedSiteName = (
  language: string,
  fallbackSiteName: string,
): string => {
  const normalizedLanguage = language.toLowerCase();

  if (language === "ru" || normalizedLanguage === "sr-Cyrl") {
    return CYRILLIC_SITE_NAME;
  }

  if (language === "en" || normalizedLanguage === "sr-Latn") {
    return LATIN_SITE_NAME;
  }

  return fallbackSiteName;
};
