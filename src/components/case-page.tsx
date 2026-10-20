import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Check,
  CodeXml,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site-shell";
import {
  portfolio,
  publishedProjects,
  homePath,
  projectPath,
} from "@/lib/content";
import { structuredData } from "@/lib/seo";
import type { Locale, Project } from "@/lib/content-schema";

export function CasePage({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const copy = portfolio.copy[locale];
  const nextProject =
    publishedProjects[
      (publishedProjects.findIndex((item) => item.slug === project.slug) + 1) %
        publishedProjects.length
    ];
  return (
    <SiteShell locale={locale} slug={project.slug}>
      <main id="content" className="case-page container">
        <div id="top" className="case-breadcrumb">
          <Link href={`${homePath(locale)}#work`}>
            <ArrowLeft size={16} aria-hidden="true" />
            {copy.backWork}
          </Link>
          <span>{copy.caseLabel}</span>
        </div>
        <section className="case-header">
          <p className="eyebrow">{project.category[locale]}</p>
          <h1>
            {project.title}
            <span className="accent-dot">.</span>
          </h1>
          <p className="case-summary">{project.summary[locale]}</p>
          <div className="case-actions">
            {project.demoUrl && (
              <a
                className="action-primary"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.liveDemo}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
            {project.repositories.map((repository) => (
              <a
                className="action-text"
                key={repository.url}
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeXml size={17} aria-hidden="true" />
                {project.repositories.length > 1
                  ? repository.label
                  : copy.source}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
        <figure className="case-preview" data-accent={project.accent}>
          <div className="browser-frame">
            <div className="browser-toolbar" aria-hidden="true">
              <span />
              <span />
              <span />
              <span className="browser-address">
                {project.demoUrl && new URL(project.demoUrl).hostname}
              </span>
            </div>
            <Image
              src={project.image}
              alt={project.imageAlt[locale]}
              width={1440}
              height={704}
              priority
              className="case-image"
            />
          </div>
          <figcaption>
            {project.title} / {project.category[locale]}
          </figcaption>
        </figure>
        <div className="case-content-grid">
          <div className="case-story">
            <section aria-labelledby="overview-title">
              <p className="eyebrow">01 / {copy.overview}</p>
              <h2 id="overview-title">{copy.overview}</h2>
              <p>{project.overview[locale]}</p>
            </section>
            {project.features[locale].length > 0 && (
              <section aria-labelledby="features-title">
                <p className="eyebrow">02 / {copy.features}</p>
                <h2 id="features-title">{copy.features}</h2>
                <ul className="feature-list">
                  {project.features[locale].map((feature) => (
                    <li key={feature}>
                      <span>
                        <Check size={16} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {project.decisions[locale].length > 0 && (
              <section aria-labelledby="decisions-title">
                <p className="eyebrow">03 / {copy.decisions}</p>
                <h2 id="decisions-title">{copy.decisions}</h2>
                <ol className="decision-list">
                  {project.decisions[locale].map((decision, index) => (
                    <li key={decision}>
                      <span>0{index + 1}</span>
                      <p>{decision}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
          <aside className="case-aside" aria-label={copy.stack}>
            <div className="case-aside-inner">
              <h2>{copy.stack}</h2>
              <div className="tech-list">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="tech-badge">
                    {tech}
                  </Badge>
                ))}
              </div>
              <h2>{copy.links}</h2>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.liveDemo}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {project.repositories.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub / {repo.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
        {publishedProjects.length > 1 && (
          <Link
            href={projectPath(locale, nextProject.slug)}
            className="next-project"
          >
            <div>
              <p className="eyebrow">{copy.nextProject}</p>
              <h2>{nextProject.title}</h2>
            </div>
            <ArrowRight size={40} strokeWidth={1.25} aria-hidden="true" />
          </Link>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData(locale, project)).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </main>
    </SiteShell>
  );
}
