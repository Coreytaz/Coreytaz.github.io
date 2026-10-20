import type { MetadataRoute } from "next";
import {
  publishedProjects,
  homePath,
  projectPath,
  absoluteUrl,
} from "@/lib/content";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [undefined, ...publishedProjects].flatMap((project) => {
    const url = (locale: "ru" | "en") =>
      absoluteUrl(
        project ? projectPath(locale, project.slug) : homePath(locale),
      );
    return (["ru", "en"] as const).map((locale) => ({
      url: url(locale),
      alternates: {
        languages: { ru: url("ru"), en: url("en"), "x-default": url("ru") },
      },
    }));
  });
}
