// insertPicList.ts
export function insertImgList(
  mobileMode: boolean,
  html: string = "",
  accentedText?: string,
  imageSrc?: string,
  imageClassName?: string,
  accentedClassName?: string,
  string_list?: string[],
  imageAndListClassName?: string,
  listClassName?: string,
  listItemsClassName?: string,
): string {
  if (!html && !accentedText && !imageSrc) {
    return "";
  }

  if (!html) {
    let result = "";

    if (imageSrc && imageClassName) {
      result += `<img src="${imageSrc}" alt="image" class="${imageClassName}" />`;
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
      result += `<img src="${imageSrc}" alt="image" class="${imageClassName}" />`;
    }

    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
    }

    return result;
  }

  const firstParagraph = match[0];
  const endOfFirstParagraph =
    html.indexOf(firstParagraph) + firstParagraph.length;

  let result = "";

  let imageAndListBlock = "";
  if (
    !mobileMode &&
    imageSrc &&
    imageClassName &&
    string_list &&
    string_list.length > 0
  ) {
    if (imageAndListClassName) {
      imageAndListBlock += `<div class="${imageAndListClassName}">`;
    } else {
      imageAndListBlock += `<div class="imageAndList">`;
    }

    imageAndListBlock += `<img src="${imageSrc}" alt="image" class="${imageClassName}" />`;

    if (listClassName) {
      imageAndListBlock += `<ul class="${listClassName}">`;
    } else {
      imageAndListBlock += `<ul class="list">`;
    }

    string_list.forEach((item) => {
      if (listItemsClassName) {
        imageAndListBlock += `<li class="${listItemsClassName}">${item}</li>`;
      } else {
        imageAndListBlock += `<li class="listItem">${item}</li>`;
      }
    });

    imageAndListBlock += `</ul>`;
    imageAndListBlock += `</div>`;
  }

  if (mobileMode) {
    if (imageSrc && imageClassName) {
      result += `<img src="${imageSrc}" alt="image" class="${imageClassName}" />`;
    }

    result += html.slice(0, endOfFirstParagraph);

    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
    }

    if (string_list && string_list.length > 0) {
      let listBlock = "";

      if (listClassName) {
        listBlock += `<ul class="${listClassName}">`;
      } else {
        listBlock += `<ul class="list">`;
      }

      string_list.forEach((item) => {
        if (listItemsClassName) {
          listBlock += `<li class="${listItemsClassName}">${item}</li>`;
        } else {
          listBlock += `<li class="listItem">${item}</li>`;
        }
      });

      listBlock += `</ul>`;

      if (!accentedText && accentedClassName) {
        result += `<div class="${accentedClassName}">${listBlock}</div>`;
      } else {
        result += listBlock;
      }
    }

    result += html.slice(endOfFirstParagraph);
  } else {
    result = html.slice(0, endOfFirstParagraph);

    if (accentedText && accentedClassName) {
      result += `<div class="${accentedClassName}">${accentedText}</div>`;
      result += imageAndListBlock;
    } else if (!accentedText && accentedClassName && imageAndListBlock) {
      result += `<div class="${accentedClassName}">${imageAndListBlock}</div>`;
    } else {
      result += imageAndListBlock;
    }

    result += html.slice(endOfFirstParagraph);
  }

  return result;
}
