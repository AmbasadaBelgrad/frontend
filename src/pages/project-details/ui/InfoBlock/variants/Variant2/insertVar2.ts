// insertVar2.ts
export function insertPicTextBlock(
  html: string = "",
  accentedText?: string,
  imageSrc?: string,
  imageLeftSrc?: string,
  imageClassName?: string,
  accentedClassName?: string,
  imageLeftClassName?: string
) {
  if (!html && !accentedText && !imageSrc && !imageLeftSrc) {
    return "";
  }

  // Извлекаем первый параграф
  const pTagRegex = /<p[^>]*>[\s\S]*?<\/p>/i;
  const match = html.match(pTagRegex);
  const firstParagraph = match ? match[0] : "";
  
  // Получаем остальной текст
  let remainingText = "";
  if (match && html) {
    const endOfFirstParagraph = html.indexOf(firstParagraph) + firstParagraph.length;
    remainingText = html.slice(endOfFirstParagraph);
  } else if (html) {
    remainingText = html;
  }

  // Разделяем остальной текст на две части (до и после изображения)
  const remainingParagraphs = remainingText.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  const textBeforeImage = remainingParagraphs[0] || "";
  const textAfterImage = remainingParagraphs[1] || "";

  // Формируем структуру точно под ваши стили
  const leftImageHtml = imageLeftSrc && imageLeftClassName
    ? `<img src="${imageLeftSrc}" class="${imageLeftClassName}" alt="" />`
    : "";

  const accentedHtml = accentedText && accentedClassName
    ? `<div class="${accentedClassName}">${accentedText}</div>`
    : "";

  const rightImageHtml = imageSrc && imageClassName
    ? `<img src="${imageSrc}" class="${imageClassName}" alt="" />`
    : "";

  // Собираем финальную структуру
  return `
    ${leftImageHtml}
    <div class="textContent">
      ${firstParagraph}
      ${accentedHtml}
      <div class="rightImageWrapper">
        <div class="textBeforeImage">
          ${textBeforeImage}
        </div>
        <div class="imageFloatWrapper">
          ${rightImageHtml}
          <div class="textAfterImage">
            ${textAfterImage}
          </div>
        </div>
      </div>
    </div>
  `;
}