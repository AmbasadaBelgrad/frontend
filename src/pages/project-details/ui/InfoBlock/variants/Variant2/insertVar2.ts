// insertVar2.ts
export function insertPicTextBlock(
  mobileMode: boolean,
  html: string = "",
  accentedText?: string,
  imageSrc?: string,
  imageLeftSrc?: string,
  imageClassName?: string,
  accentedClassName?: string,
  imageLeftClassName?: string,
  textContentClassName?: string,
  rightImageWrapperClassName?: string,
) {
  if (!html && !accentedText && !imageSrc && !imageLeftSrc) {
    return "";
  }

  // Извлекаем первый параграф
  const pTagRegex = /<p[^>]*>[\s\S]*?<\/p>/i;
  const match = html.match(pTagRegex);
  const firstParagraph = match ? match[0] : "";

  // Получаем остальной текст (все параграфы после первого)
  let remainingText = "";
  if (match && html) {
    const endOfFirstParagraph =
      html.indexOf(firstParagraph) + firstParagraph.length;
    remainingText = html.slice(endOfFirstParagraph);
  } else if (html) {
    remainingText = html;
  }

  const leftImageHtml =
    imageLeftSrc && imageLeftClassName
      ? `<img src="${imageLeftSrc}" loading="lazy" class="${imageLeftClassName}" alt="left image" />`
      : "";

  // Формируем акцентированный текст
  const accentedHtml =
    accentedText && accentedClassName
      ? `<div class="${accentedClassName}">${accentedText}</div>`
      : accentedText
        ? `<div>${accentedText}</div>`
        : "";

  // Формируем правую картинку
  let rightImageHtml = "";
  if (imageSrc) {
    rightImageHtml = `<img src="${imageSrc}" class="${imageClassName}" loading="lazy" alt="right image" />`;
  }

  // В мобильном режиме правая картинка вставляется перед всем контентом
  if (mobileMode) {
    return `
${rightImageHtml}
<div class="${textContentClassName}">
  ${firstParagraph}
  ${accentedHtml}
  ${remainingText}
</div>`;
  }

  // Десктопный режим (исходная структура)
  return `
${leftImageHtml}
<div class="${textContentClassName}">
  ${firstParagraph}
  ${accentedHtml}
  <div class="${rightImageWrapperClassName}">
    ${rightImageHtml}
    ${remainingText}
  </div>
</div>`;
}
