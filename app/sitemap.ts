import type { MetadataRoute } from "next";

const BASE_URL = "https://boss-fit.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/test`,
    },
  ];
}
