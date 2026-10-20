import { z } from "zod";

export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
const text = z.string().trim().min(1, "Text must not be empty");
const localized = z.object({ ru: text, en: text }).strict();
const localizedList = z
  .object({ ru: z.array(text), en: z.array(text) })
  .strict();
const httpsUrl = z
  .url()
  .refine(
    (value) => URL.canParse(value) && new URL(value).protocol === "https:",
    "Use an HTTPS URL",
  );
const optionalUrl = httpsUrl.nullable();
const image = z
  .string()
  .regex(
    /^\/images\/projects\/[a-z0-9-]+\.webp$/,
    "Use /images/projects/name.webp",
  );

export const copyKeys = [
  "skip",
  "navWork",
  "navAbout",
  "navContact",
  "navMenu",
  "navClose",
  "theme",
  "language",
  "home",
  "heroEyebrow",
  "heroLine1",
  "heroLine2",
  "heroLine3",
  "viewWork",
  "github",
  "scroll",
  "indexLabel",
  "workEyebrow",
  "workTitle",
  "workIntro",
  "caseStudy",
  "liveDemo",
  "source",
  "backend",
  "projectCount",
  "aboutEyebrow",
  "aboutTitle",
  "aboutNote",
  "skillsTitle",
  "skillsIntro",
  "relatedProjects",
  "contactEyebrow",
  "contactTitle",
  "contactIntro",
  "contactAction",
  "email",
  "telegram",
  "resume",
  "footerNote",
  "backTop",
  "print",
  "backWork",
  "overview",
  "features",
  "decisions",
  "stack",
  "links",
  "nextProject",
  "caseLabel",
  "notFoundTitle",
  "notFoundText",
  "experienceTitle",
  "allProjects",
] as const;

export const projectSchema = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug"),
    title: text,
    status: z.enum(["draft", "published"]),
    order: z.number().int().nonnegative(),
    featured: z.boolean(),
    category: localized,
    summary: localized,
    overview: localized,
    features: localizedList,
    decisions: localizedList,
    technologies: z.array(text).min(1),
    image,
    imageSource: z
      .string()
      .regex(
        /^assets\/[\w .-]+\.(png|jpe?g|webp|avif)$/i,
        "Use assets/filename.png (or jpg, webp, avif)",
      ),
    imageAlt: localized,
    accent: z.enum(["blue", "mint", "lilac"]),
    demoUrl: optionalUrl,
    repositories: z.array(z.object({ label: text, url: httpsUrl }).strict()),
  })
  .strict();

export const portfolioSchema = z
  .object({
    $schema: z.string().optional(),
    version: z.literal(1),
    site: z
      .object({
        baseUrl: httpsUrl.refine(
          (value) => URL.canParse(value) && new URL(value).pathname === "/",
          "Use an origin without a path",
        ),
        title: localized,
        description: localized,
      })
      .strict(),
    profile: z
      .object({
        name: localized,
        role: localized,
        intro: localized,
        about: localized,
        github: httpsUrl,
        email: z.email().nullable(),
        telegram: optionalUrl,
        resume: optionalUrl,
      })
      .strict(),
    copy: z
      .object({
        ru: z.record(z.enum(copyKeys), text),
        en: z.record(z.enum(copyKeys), text),
      })
      .strict(),
    skills: z.array(
      z
        .object({
          id: text,
          title: localized,
          description: localized,
          technologies: z.array(text).min(1),
          projects: z.array(text),
        })
        .strict(),
    ),
    experience: z.array(
      z
        .object({
          company: text,
          role: localized,
          period: localized,
          description: localized,
        })
        .strict(),
    ),
    projects: z.array(projectSchema).min(1),
  })
  .strict()
  .superRefine((content, ctx) => {
    const slugs = new Set<string>();
    const demos = new Set<string>();
    content.projects.forEach((project, index) => {
      if (slugs.has(project.slug))
        ctx.addIssue({
          code: "custom",
          path: ["projects", index, "slug"],
          message: "Duplicate project slug",
        });
      slugs.add(project.slug);
      if (project.status === "published") {
        if (!project.demoUrl) {
          ctx.addIssue({
            code: "custom",
            path: ["projects", index, "demoUrl"],
            message: "Published projects need an external demo URL",
          });
        } else {
          if (!URL.canParse(project.demoUrl)) return;
          const url = new URL(project.demoUrl);
          const ownOrigin = URL.canParse(content.site.baseUrl)
            ? new URL(content.site.baseUrl).origin
            : null;
          if (
            url.hostname === "github.io" ||
            url.hostname.endsWith(".github.io") ||
            url.origin === ownOrigin ||
            ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
          ) {
            ctx.addIssue({
              code: "custom",
              path: ["projects", index, "demoUrl"],
              message: "Demo must be external and hosted outside GitHub Pages",
            });
          }
          const key = project.demoUrl.replace(/\/$/, "");
          if (demos.has(key))
            ctx.addIssue({
              code: "custom",
              path: ["projects", index, "demoUrl"],
              message: "Duplicate published demo URL; check the project link",
            });
          demos.add(key);
        }
      }
    });
    content.skills.forEach((skill, index) =>
      skill.projects.forEach((slug, projectIndex) => {
        if (!slugs.has(slug))
          ctx.addIssue({
            code: "custom",
            path: ["skills", index, "projects", projectIndex],
            message: `Unknown project: ${slug}`,
          });
      }),
    );
  });

export type Portfolio = z.infer<typeof portfolioSchema>;
export type Project = z.infer<typeof projectSchema>;
