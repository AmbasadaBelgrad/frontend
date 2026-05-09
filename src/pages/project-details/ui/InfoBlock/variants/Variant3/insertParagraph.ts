export function insertAfterFirstParagraph(
  mobileMode: boolean,
  html: string = "",
  accentedText?: string,
  imageSrc?: string,
  imageClassName?: string,
  accentedClassName?: string,
) {
  if (!html && !accentedText && !imageSrc) {
    return "";
  }

  if (!html) {
    let result = "";

    if (imageSrc && imageClassName) {
      result += `<img src="${imageSrc}" loading="lazy" alt="image" class="${imageClassName}" />`;
    }

    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
    }

    return result;
  }

  const pTagRegex = /<p[^>]*>[\s\S]*?<\/p>/i;
  const match = html.match(pTagRegex);

  if (!match) {
    let result = html;

    if (imageSrc && imageClassName) {
      result += `<img src="${imageSrc}" alt="image" loading="lazy" class="${imageClassName}" />`;
    }

    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
    }

    return result;
  }

  const firstParagraph = match[0];
  const endOfFirstParagraph =
    html.indexOf(firstParagraph) + firstParagraph.length;
  const afterFirstParagraph = html.slice(endOfFirstParagraph);

  if (mobileMode) {
    // Мобильная версия: картинка → первый параграф → акцентированный текст → остальной текст
    let result = "";

    // Сначала картинка
    if (imageSrc && imageClassName) {
      result += `<img src="${imageSrc}" alt="image" loading="lazy" class="${imageClassName}" />`;
    }

    // Первый параграф
    result += firstParagraph;

    // Акцентированный текст
    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
    }

    // Остальной текст
    result += afterFirstParagraph;

    return result;
  } else {
    // Десктопная версия: первый параграф → картинка → акцентированный текст → остальной текст
    let result = "";

    // Первый параграф
    result += firstParagraph;

    // Картинка
    if (imageSrc && imageClassName) {
      result += `<img src="${imageSrc}" alt="image" loading="lazy" class="${imageClassName}" />`;
    }

    // Акцентированный текст
    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
    }

    // Остальной текст
    result += afterFirstParagraph;

    return result;
  }
}
