import type { MetadataRoute } from "next";

const BASE_URL = "https://skin.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/survey`,
    },
  ];
}
