import type { Metadata } from "next";
import {
  portfolio,
  publishedProjects,
  absoluteUrl,
  homePath,
  projectPath,
} from "@/lib/content";
import type { Locale, Project } from "@/lib/content-schema";

export function pageMetadata(locale: Locale, project?: Project): Metadata {
  const pathname = project
    ? projectPath(locale, project.slug)
    : homePath(locale);
  const title = project
    ? `${project.title} — ${portfolio.profile.name[locale]}`
    : portfolio.site.title[locale];
  const description =
    project?.summary[locale] ?? portfolio.site.description[locale];
  const image = absoluteUrl(`/og/${project?.slug ?? "home"}-${locale}.png`);
  return {
    metadataBase: new URL(portfolio.site.baseUrl),
    title,
    description,
    authors: [
      { name: portfolio.profile.name[locale], url: portfolio.profile.github },
    ],
    alternates: {
      canonical: absoluteUrl(pathname),
      languages: {
        ru: absoluteUrl(
          project ? projectPath("ru", project.slug) : homePath("ru"),
        ),
        en: absoluteUrl(
          project ? projectPath("en", project.slug) : homePath("en"),
        ),
        "x-default": absoluteUrl(
          project ? projectPath("ru", project.slug) : homePath("ru"),
        ),
      },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(pathname),
      title,
      description,
      siteName: portfolio.profile.name[locale],
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
    robots: { index: true, follow: true },
  };
}

export function structuredData(locale: Locale, project?: Project) {
  const personId = absoluteUrl("/#person");
  const person = {
    "@type": "Person",
    "@id": personId,
    name: portfolio.profile.name[locale],
    jobTitle: portfolio.profile.role[locale],
    url: absoluteUrl(homePath(locale)),
    sameAs: [portfolio.profile.github],
    ...(portfolio.profile.email ? { email: portfolio.profile.email } : {}),
  };
  const graph = project
    ? [
        person,
        {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary[locale],
          url: absoluteUrl(projectPath(locale, project.slug)),
          image: absoluteUrl(project.image),
          inLanguage: locale,
          author: { "@id": personId },
          keywords: project.technologies.join(", "),
          sameAs: [
            project.demoUrl,
            ...project.repositories.map((repo) => repo.url),
          ].filter(Boolean),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: portfolio.copy[locale].home,
              item: absoluteUrl(homePath(locale)),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: project.title,
              item: absoluteUrl(projectPath(locale, project.slug)),
            },
          ],
        },
      ]
    : [
        person,
        {
          "@type": "WebSite",
          "@id": absoluteUrl("/#website"),
          url: portfolio.site.baseUrl,
          name: portfolio.site.title[locale],
          inLanguage: ["ru", "en"],
          author: { "@id": personId },
        },
        {
          "@type": "ItemList",
          name: portfolio.copy[locale].navWork,
          itemListElement: publishedProjects.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            url: absoluteUrl(projectPath(locale, item.slug)),
          })),
        },
      ];
  return { "@context": "https://schema.org", "@graph": graph };
}
