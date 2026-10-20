import type { MetadataRoute } from "next";
import { portfolio, absoluteUrl } from "@/lib/content";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: portfolio.site.baseUrl,
  };
}
