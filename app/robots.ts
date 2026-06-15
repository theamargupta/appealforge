import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Served at /robots.txt — allows crawling, blocks the API, points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
