import { useEffect } from "react";
import type { InitResponse } from "../model/types";

export function useInitSeo(initData?: InitResponse) {
  useEffect(() => {
    if (!initData) return;

    document.title = initData.site_name;

    if (initData.seo_description) {
      let metaDescription = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.content = initData.seo_description;
    }
  }, [initData]);
}
