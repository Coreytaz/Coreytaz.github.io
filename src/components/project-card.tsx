import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { portfolio, projectPath } from "@/lib/content";
import type { Locale, Project } from "@/lib/content-schema";

export function ProjectCard({
  project,
  locale,
  index,
  large = false,
}: {
  project: Project;
  locale: Locale;
  index: number;
  large?: boolean;
}) {
  const copy = portfolio.copy[locale];
  return (
    <article
      className={`project-card ${large ? "project-card-featured" : ""}`}
      data-accent={project.accent}
    >
      <Link
        href={projectPath(locale, project.slug)}
        className="project-visual"
        aria-label={`${project.title} — ${copy.caseStudy}`}
      >
        <div className="project-visual-top">
          <span className="project-number">
            0{index + 1} / {project.category[locale]}
          </span>
          <span className="project-visual-arrow">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
        <div className="browser-frame">
          <div className="browser-toolbar" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="browser-address">
              {project.demoUrl
                ? new URL(project.demoUrl).hostname
                : project.title}
            </span>
          </div>
          <Image
            src={project.image}
            alt={project.imageAlt[locale]}
            width={1440}
            height={704}
            sizes={
              large
                ? "(max-width: 800px) 100vw, 70vw"
                : "(max-width: 800px) 100vw, 50vw"
            }
            className="project-image"
          />
        </div>
      </Link>
      <div className="project-description">
        <div className="project-heading">
          <div>
            <span className="eyebrow project-category">
              {project.category[locale]}
            </span>
            <h3>
              <Link href={projectPath(locale, project.slug)}>
                {project.title}
              </Link>
            </h3>
          </div>
          <Link
            className="project-round-link"
            href={projectPath(locale, project.slug)}
            aria-label={`${copy.caseStudy}: ${project.title}`}
          >
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <p>{project.summary[locale]}</p>
        <div className="tech-list">
          {project.technologies.slice(0, large ? 5 : 3).map((tech) => (
            <Badge key={tech} variant="outline" className="tech-badge">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="project-actions">
          <Link href={projectPath(locale, project.slug)}>
            {copy.caseStudy}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              {copy.liveDemo}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
