import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Check,
  CodeXml,
  Layers3,
  Braces,
  ListTree,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteShell } from "@/components/site-shell";
import { MotionView } from "@/components/motion-view";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import StarBorder from "@/components/react-bits/StarBorder";
import {
  portfolio,
  publishedProjects,
  homePath,
  projectPath,
} from "@/lib/content";
import { structuredData } from "@/lib/seo";
import type { Locale, Project } from "@/lib/content-schema";

function CasePanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={`case-panel border border-border print:bg-white! print:p-4! print:shadow-none ${className}`}
      spotlightColor="var(--primary)"
      intensity={0.1}
      borderGlow={0.45}
      spotlightSize={300}
      proximity={35}
      flare={false}
      style={
        {
          "--spotlight-card-surface": "var(--card)",
          "--spotlight-card-border": "var(--border)",
          "--spotlight-card-shadow": "none",
        } as CSSProperties
      }
    >
      {children}
    </SpotlightCard>
  );
}

function CaseStack({ project, label }: { project: Project; label: string }) {
  return (
    <CasePanel className="case-stack-panel h-full">
      <div className="flex items-center justify-between gap-5 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
            <Layers3 size={19} aria-hidden="true" />
          </span>
          <h2 className="text-sm font-semibold">{label}</h2>
        </div>
        <span
          aria-hidden="true"
          className="font-mono text-[10px] text-muted-foreground"
        >
          {String(project.technologies.length).padStart(2, "0")}
        </span>
      </div>
      <div className="tech-list mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="tech-badge h-auto rounded-lg border-border bg-background px-2.5 py-2 font-mono text-[10px] font-normal text-foreground"
          >
            {tech}
          </Badge>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="mt-8 flex items-center gap-2 border-t border-border pt-5 font-mono text-[10px] text-muted-foreground"
      >
        <Braces size={14} className="text-primary" />
        {project.slug}
        <span className="ml-auto text-primary">&lt;/&gt;</span>
      </div>
    </CasePanel>
  );
}

const eyebrow =
  "font-mono text-[10px] leading-relaxed tracking-[0.12em] uppercase text-muted-foreground";
const sectionTitle =
  "mt-3 mb-6 text-2xl font-semibold tracking-[-0.045em] sm:text-[30px]";
const sourceLink =
  "group flex min-h-11 items-center justify-between gap-4 rounded-lg text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary";

export function CasePage({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const copy = portfolio.copy[locale];
  const projectIndex = publishedProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject =
    publishedProjects[(projectIndex + 1) % publishedProjects.length];
  const sections = [
    { id: "overview-title", title: copy.overview },
    ...(project.features[locale].length
      ? [{ id: "features-title", title: copy.features }]
      : []),
    ...(project.decisions[locale].length
      ? [{ id: "decisions-title", title: copy.decisions }]
      : []),
  ];

  return (
    <SiteShell locale={locale} slug={project.slug}>
      <MotionView name="portfolio-page">
        <main
          id="content"
          className="case-page container mx-auto w-[min(1240px,calc(100%-112px))] max-[1100px]:w-[calc(100%-72px)] max-[800px]:w-[calc(100%-48px)] max-[480px]:w-[calc(100%-40px)] print:w-full"
        >
          <div
            id="top"
            className="case-breadcrumb flex items-center justify-between gap-4 pt-8 sm:pt-10"
          >
            <Link
              href={`${homePath(locale)}#work`}
              transitionTypes={["project-return"]}
              className="group inline-flex min-h-10 items-center gap-2.5 rounded-full border border-border px-4 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {copy.backWork}
            </Link>
            <span className={`${eyebrow} text-right`}>
              {String(projectIndex + 1).padStart(2, "0")} / {copy.caseLabel}
            </span>
          </div>

          <section className="case-header grid items-end gap-9 py-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-16 lg:py-14 print:block print:py-5">
            <div className="min-w-0">
              <p className={`${eyebrow} flex items-center gap-2.5`}>
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-primary"
                />
                {project.category[locale]}
              </p>
              <MotionView
                name={`project-title-${project.slug}`}
                kind="project-title"
              >
                <h1 className="mt-4 w-fit text-[clamp(44px,7.5vw,104px)] leading-[1.08] font-semibold tracking-[-0.065em] print:text-[38pt]">
                  {project.title}
                  <span className="accent-dot text-primary">.</span>
                </h1>
              </MotionView>
              <p className="case-summary mt-6 max-w-[650px] text-[16px] leading-[1.8] text-muted-foreground sm:text-lg">
                {project.summary[locale]}
              </p>
              <div className="case-actions mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {project.demoUrl && (
                  <StarBorder
                    as="a"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    radius={12}
                    duration={7}
                    sparkle={false}
                    clickPulse={false}
                    stars={1}
                    glow={0.4}
                    color="var(--primary-foreground)"
                    backgroundColor="var(--primary)"
                    textColor="var(--primary-foreground)"
                    borderColor="color-mix(in srgb, var(--primary-foreground) 20%, transparent)"
                    className="action-primary min-h-12 text-xs"
                  >
                    {copy.liveDemo}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </StarBorder>
                )}
                {project.repositories.map((repository) => (
                  <a
                    className="action-text inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                    key={repository.url}
                    href={repository.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CodeXml size={15} aria-hidden="true" />
                    {project.repositories.length > 1
                      ? repository.label
                      : copy.source}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden self-stretch lg:block print:block">
              <CaseStack project={project} label={copy.stack} />
            </div>
          </section>

          <figure
            className="case-preview m-0 overflow-hidden rounded-2xl border border-border bg-card sm:rounded-3xl print:break-inside-avoid"
            data-accent={project.accent}
          >
            <div className="browser-frame overflow-hidden rounded-[inherit] bg-card">
              <div
                className="browser-toolbar flex h-11 items-center gap-1.5 border-b border-border bg-muted/60 px-4 text-muted-foreground sm:px-6"
                aria-hidden="true"
              >
                <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                <span className="browser-address mx-auto truncate px-4 font-mono text-[10px]">
                  {project.demoUrl
                    ? new URL(project.demoUrl).hostname
                    : project.repositories[0] &&
                      new URL(project.repositories[0].url).hostname}
                </span>
                <ArrowUpRight size={13} />
              </div>
              <div className="bg-[color-mix(in_srgb,var(--project-tint)_45%,var(--background))] p-3 sm:p-6 lg:p-8">
                <div className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-lg sm:rounded-xl">
                  <MotionView
                    name={`project-image-${project.slug}`}
                    kind="project-image"
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt[locale]}
                      width={1440}
                      height={704}
                      priority
                      sizes="(max-width: 800px) 100vw, 1200px"
                      className="case-image block h-auto w-full"
                    />
                  </MotionView>
                </div>
              </div>
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-4 font-mono text-[9px] text-muted-foreground sm:px-6">
              <span>
                {project.title} / {project.category[locale]}
              </span>
              <span aria-hidden="true" className="text-primary">
                {String(projectIndex + 1).padStart(2, "0")} —{" "}
                {String(publishedProjects.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
          <div className="mt-6 lg:hidden print:hidden">
            <CaseStack project={project} label={copy.stack} />
          </div>

          <div className="case-content-grid my-12 grid items-start gap-8 lg:my-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 print:block">
            <div className="case-story min-w-0 space-y-8">
              <section aria-labelledby="overview-title" data-reveal>
                <CasePanel>
                  <p className={eyebrow}>01 / {copy.overview}</p>
                  <h2
                    id="overview-title"
                    className={`${sectionTitle} scroll-mt-32`}
                  >
                    {copy.overview}
                  </h2>
                  <p className="max-w-[750px] text-[15px] leading-[1.95] text-muted-foreground">
                    {project.overview[locale]}
                  </p>
                </CasePanel>
              </section>
              {project.features[locale].length > 0 && (
                <section aria-labelledby="features-title" data-reveal>
                  <CasePanel>
                    <p className={eyebrow}>02 / {copy.features}</p>
                    <h2
                      id="features-title"
                      className={`${sectionTitle} scroll-mt-32`}
                    >
                      {copy.features}
                    </h2>
                    <ul className="feature-list m-0 grid list-none gap-3 p-0">
                      {project.features[locale].map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-4 rounded-xl border border-border bg-background/60 px-4 py-4 text-sm leading-[1.8]"
                        >
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <Check size={14} aria-hidden="true" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CasePanel>
                </section>
              )}
              {project.decisions[locale].length > 0 && (
                <section aria-labelledby="decisions-title" data-reveal>
                  <CasePanel>
                    <p className={eyebrow}>03 / {copy.decisions}</p>
                    <h2
                      id="decisions-title"
                      className={`${sectionTitle} scroll-mt-32`}
                    >
                      {copy.decisions}
                    </h2>
                    <ol className="decision-list m-0 list-none p-0">
                      {project.decisions[locale].map((decision, index) => (
                        <li
                          key={decision}
                          className="group/decision relative flex gap-5 pb-7 last:pb-0"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute top-8 bottom-0 left-4 w-px bg-border group-last/decision:hidden"
                          />
                          <span className="relative grid size-8 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/5 font-mono text-[10px] text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="pt-1 text-sm leading-[1.85] text-muted-foreground">
                            {decision}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </CasePanel>
                </section>
              )}
            </div>
            <aside
              className="case-aside lg:sticky lg:top-32 print:mt-8"
              aria-label={copy.links}
            >
              <CasePanel className="case-aside-inner">
                <div className="mb-5 flex items-center gap-2 text-primary">
                  <ListTree size={16} aria-hidden="true" />
                  <span className={eyebrow}>{copy.caseLabel}</span>
                </div>
                <nav
                  className="space-y-1 border-b border-border pb-6"
                  aria-label={copy.caseLabel}
                >
                  {sections.map((section, index) => (
                    <a
                      href={`#${section.id}`}
                      key={section.id}
                      className="flex min-h-10 items-center gap-3 rounded-lg text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="font-mono text-[9px] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  ))}
                </nav>
                <h2 className="mt-6 mb-2 text-xs font-semibold">
                  {copy.links}
                </h2>
                {project.demoUrl && (
                  <a
                    className={sourceLink}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.liveDemo}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                {project.repositories.map((repo) => (
                  <a
                    className={sourceLink}
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub / {repo.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </CasePanel>
            </aside>
          </div>

          {publishedProjects.length > 1 && (
            <Link
              href={projectPath(locale, nextProject.slug)}
              className="next-project group mb-16 block rounded-3xl print:hidden"
            >
              <CasePanel>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className={eyebrow}>{copy.nextProject}</p>
                    <h2 className="mt-3 text-[clamp(28px,4vw,48px)] leading-tight font-semibold tracking-[-0.05em] transition-colors group-hover:text-primary">
                      {nextProject.title}
                      <span className="text-primary">.</span>
                    </h2>
                  </div>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border bg-background text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight
                      size={25}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </CasePanel>
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
      </MotionView>
    </SiteShell>
  );
}
