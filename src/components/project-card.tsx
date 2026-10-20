import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MotionView } from "@/components/motion-view";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
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
      className={`project-card project-showcase ${large ? "project-card-featured" : ""}`}
      data-accent={project.accent}
      data-reveal
    >
      <SpotlightCard
        className="project-spotlight"
        spotlightColor="var(--primary)"
        intensity={0.16}
        spotlightSize={300}
        borderGlow={0.65}
        proximity={45}
        flare={false}
      >
        <Link
          href={projectPath(locale, project.slug)}
          transitionTypes={["project"]}
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
          <span className="project-stage-grid" aria-hidden="true" />
          <div
            className="project-preview"
            style={{ aspectRatio: "1440 / 790" }}
          >
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
              <MotionView
                name={`project-image-${project.slug}`}
                kind="project-image"
              >
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
              </MotionView>
            </div>
          </div>
          <span className="project-stage-caption" aria-hidden="true">
            {project.title}
            <span>{project.technologies.slice(0, 2).join(" / ")}</span>
          </span>
        </Link>
      </SpotlightCard>
      <div className="project-description">
        <div className="project-heading">
          <div>
            <span className="eyebrow project-category">
              {project.category[locale]}
            </span>
            <MotionView
              name={`project-title-${project.slug}`}
              kind="project-title"
            >
              <h3>
                <Link href={projectPath(locale, project.slug)}>
                  {project.title}
                </Link>
              </h3>
            </MotionView>
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
        {large && project.features[locale].length > 0 && (
          <ul className="project-highlights">
            {project.features[locale].slice(0, 3).map((feature) => (
              <li key={feature}>
                <Check size={14} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="tech-list">
          {project.technologies.slice(0, 5).map((tech) => (
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
