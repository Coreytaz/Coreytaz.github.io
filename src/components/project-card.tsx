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
      className={String.raw`project-card [&.project-showcase]:[border:1px_solid_var(--border)] [&.project-showcase]:rounded-[20px] [&.project-showcase]:overflow-hidden [&.project-showcase]:[background:var(--card)] [&.project-showcase]:flex [&.project-showcase]:flex-col print:[&.project-showcase]:grid print:[&.project-showcase]:grid-cols-[1fr_1fr] print:[&.project-showcase]:[border:0] print:[&.project-showcase]:rounded-none min-w-[0] print:grid print:grid-cols-[1fr_1fr] print:gap-6 print:mb-5.5 print:[break-inside:avoid] project-showcase [&_.project-spotlight]:rounded-none [&_.project-visual]:min-h-85 [&_.project-visual]:p-[66px_28px_50px] [&_.project-visual]:rounded-none [&_.project-visual]:[background:linear-gradient(_140deg,_color-mix(in_srgb,_var(--project-tint)_70%,_var(--background)),_var(--project-tint)_)] [&.project-card-featured_.project-visual]:min-h-[455px] [&.project-card-featured_.project-visual]:h-full [&.project-card-featured_.project-visual]:p-[74px_30px_65px] [&_.project-visual_.browser-frame]:[transform:none] [&_.project-visual_.browser-frame]:[transition:none] [&_.project-visual_.browser-frame]:[border:1px_solid_color-mix(in_srgb,_var(--foreground)_12%,_transparent)] [&_.project-visual_.browser-frame]:rounded-[10px] [&_.project-visual_.browser-frame]:h-full [&_.project-visual_.browser-frame]:[background:var(--background)] [&_.project-visual_.browser-frame]:[box-shadow:0_15px_35px_#00000018] [&_.browser-toolbar]:[background:var(--muted)] [&_.browser-toolbar]:text-muted-foreground [&_.browser-toolbar]:h-6.5 [&_.browser-toolbar]:px-3 [&_.browser-toolbar]:[border-bottom:1px_solid_var(--border)] [&_.browser-address]:[font-size:8px] [&_.project-description]:p-[27px_28px_28px] [&_.project-description]:flex [&_.project-description]:flex-col [&_.project-description]:flex-[1] [&.project-card-featured_.project-description]:p-[35px] [&.project-card-featured_.project-description]:justify-center [&_.project-actions]:mt-auto [&_.project-actions]:pt-5.5 [&_.project-actions]:gap-2.5 [&_.project-actions_a]:inline-flex [&_.project-actions_a]:justify-center [&_.project-actions_a]:items-center [&_.project-actions_a]:gap-[9px] [&_.project-actions_a]:min-h-[39px] [&_.project-actions_a]:p-[10px_14px] [&_.project-actions_a]:[border:1px_solid_var(--border)] [&_.project-actions_a]:rounded-[9px] [&_.project-actions_a]:[font-size:11px] [&_.project-actions_a:first-child]:[background:var(--primary)] [&_.project-actions_a:first-child]:[border-color:transparent] [&_.project-actions_a:first-child]:text-primary-foreground [&_.project-actions_a:hover]:[box-shadow:0_0_0_3px_color-mix(in_srgb,_var(--primary)_12%,_transparent)] [&_.project-heading_h3]:[font-size:25px] [&.project-card-featured_.project-heading_h3]:[font-size:34px] max-[800.01px]:[&_.project-visual]:min-h-[0] max-[800.01px]:[&_.project-visual]:p-[60px_20px_45px] max-[800.01px]:[&.project-card-featured_.project-visual]:min-h-[0] max-[800.01px]:[&.project-card-featured_.project-visual]:p-[60px_20px_45px] max-[800.01px]:[&_.project-description]:p-6 max-[800.01px]:[&.project-card-featured_.project-description]:p-6 max-[800.01px]:[&.project-card-featured_.project-heading_h3]:[font-size:28px] max-[800.01px]:[&_.browser-address]:[font-size:7px] print:[&_.project-description]:p-0 print:[&.project-card-featured_.project-description]:p-0 ${large ? "project-card-featured [&.project-showcase]:grid [&.project-showcase]:grid-cols-[1.35fr_1fr] [&.project-showcase]:items-stretch [&.project-showcase]:gap-0 max-[800.01px]:[&.project-showcase]:flex col-[1_/_-1] grid grid-cols-[1.55fr_1fr] gap-10 items-center [&_.project-visual]:min-h-95 [&_.project-visual]:p-[78px_36px_62px] [&_.project-description]:p-[0_8px_0_0] [&_h3]:[font-size:36px] max-[1100.01px]:gap-7.5 max-[1100.01px]:[&_.project-visual]:min-h-82.5 max-[1100.01px]:[&_.project-visual]:px-[25px] max-[800.01px]:block max-[800.01px]:[&_.project-description]:p-[24px_0_0] max-[800.01px]:[&_h3]:[font-size:28px] max-[800.01px]:[&_.project-visual]:min-h-80 max-[800.01px]:[&_.project-visual]:p-[70px_35px_50px] max-[480.01px]:col-auto max-[480.01px]:[&_.project-visual]:min-h-[265px] max-[480.01px]:[&_.project-visual]:p-[65px_25px_43px] max-[480.01px]:[&_h3]:[font-size:28px] print:grid print:grid-cols-[1fr_1fr] print:gap-6 print:mb-5.5 print:[break-inside:avoid] print:[&_.project-visual]:min-h-[0] print:[&_.project-visual]:p-[28px_15px_22px] print:[&_.project-visual]:[print-color-adjust:exact] print:[&_.project-description]:p-0 print:[&_h3]:[font-size:19pt]" : ""}`}
      data-accent={project.accent}
      data-reveal
    >
      <SpotlightCard
        className={String.raw`project-spotlight [&_>_.spotlight-card\_\_light]:z-[3] [&_>_.spotlight-card\_\_border]:[background:transparent] [&_>_.spotlight-card\_\_edge]:z-[4]`}
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
          className={
            "project-visual flex items-center relative min-h-80 [background:var(--project-tint,_#e0e8f6)] rounded-[12px] overflow-hidden isolate p-[64px_28px_42px] [&_.browser-frame]:[transform:none] [&:hover_.project-visual-arrow]:[transform:rotate(45deg)] max-[1100.01px]:min-h-72.5 max-[800.01px]:min-h-55 max-[800.01px]:p-[60px_16px_36px] max-[480.01px]:min-h-[265px] max-[480.01px]:p-[65px_25px_43px] [html[data-motion='off']_&:hover_.project-visual-arrow]:[transform:none] [html[data-motion='off']_&:hover_.browser-frame]:[transform:rotate(-3deg)] print:min-h-[0] print:p-[28px_15px_22px] print:[print-color-adjust:exact]"
          }
          aria-label={`${project.title} — ${copy.caseStudy}`}
        >
          <div
            className={
              "project-visual-top absolute inset-[18px_20px_auto] flex justify-between items-center gap-2.5 z-[2] max-[800.01px]:inset-[13px_13px_auto] print:hidden"
            }
          >
            <span
              className={
                "project-number [font:9px_ui-monospace,_monospace] [color:#505c63] tracking-[0.025em] dark:[color:#c4ccd6] max-[800.01px]:[font-size:8px] max-[480.01px]:[font-size:9px]"
              }
            >
              0{index + 1} / {project.category[locale]}
            </span>
            <span
              className={
                "project-visual-arrow grid [place-items:center] w-[31px] h-[31px] [border:1px_solid_#ffffff80] rounded-[50%] [background:#ffffff40] [color:#2d3d50] [transition:transform_0.25s] dark:[color:#d4dceb] dark:[background:#ffffff0a] dark:[border-color:#ffffff30] print:hidden!"
              }
            >
              <ArrowUpRight size={20} aria-hidden="true" />
            </span>
          </div>
          <span
            className={
              "project-stage-grid absolute inset-0 z-[-1] [background-image:linear-gradient(_color-mix(in_srgb,_var(--primary)_7%,_transparent)_1px,_transparent_1px_),_linear-gradient(_90deg,_color-mix(in_srgb,_var(--primary)_7%,_transparent)_1px,_transparent_1px_)] [background-size:30px_30px] [mask-image:linear-gradient(135deg,_transparent,_black)] print:hidden"
            }
            aria-hidden="true"
          />
          <div
            className={
              "project-preview relative flex-[1] min-w-[0] [&_>_.browser-frame]:absolute [&_>_.browser-frame]:inset-0"
            }
            style={{ aspectRatio: "1440 / 790" }}
          >
            <div
              className={
                "browser-frame w-full [border:4px_solid_var(--border)] rounded-[9px] [background:var(--card)] overflow-hidden [box-shadow:0_20px_35px_#15294720] relative z-[1]"
              }
            >
              <div
                className={
                  "browser-toolbar h-[23px] flex items-center gap-1 p-[0_8px] [background:var(--muted)] text-muted-foreground [&_>_span:not(.browser-address)]:w-1 [&_>_span:not(.browser-address)]:h-1 [&_>_span:not(.browser-address)]:[background:#d8dce0] [&_>_span:not(.browser-address)]:rounded-[100%]"
                }
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <span
                  className={
                    "browser-address [font:6px_ui-monospace,_monospace] text-center m-auto pr-4.5"
                  }
                >
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
                  className={
                    "project-image block w-full h-auto aspect-[1440_/_704] object-cover [object-position:top]"
                  }
                />
              </MotionView>
            </div>
          </div>
          <span
            className={
              "project-stage-caption absolute bottom-[18px] [inset-inline:24px] flex justify-between gap-3 text-muted-foreground [font:9px_ui-monospace,_monospace] [&_>_span]:[font-size:7px] [&_>_span]:tracking-[0.08em] max-[800.01px]:[inset-inline:20px] print:hidden"
            }
            aria-hidden="true"
          >
            {project.title}
            <span>{project.technologies.slice(0, 2).join(" / ")}</span>
          </span>
        </Link>
      </SpotlightCard>
      <div
        className={
          "project-description pt-6 [&_>_p]:[font-size:13px] [&_>_p]:text-muted-foreground [&_>_p]:leading-[1.85] [&_>_p]:mt-3.5 [&_>_p]:max-w-[390px] max-[800.01px]:[&_>_p]:[font-size:12px] max-[480.01px]:pt-5 max-[480.01px]:[&_>_p]:[font-size:13px] print:p-0 print:[&_>_p]:mt-1.5 print:[&_>_p]:[font-size:9pt]"
        }
      >
        <div
          className={
            "project-heading flex items-center justify-between gap-[15px] [&_h3]:[font-size:28px] [&_h3]:leading-[1.3] [&_h3]:[font-weight:650] [&_h3]:tracking-[-0.045em] [&_h3]:mt-[7px] max-[800.01px]:[&_h3]:[font-size:23px] max-[480.01px]:[&_h3]:[font-size:28px] print:[&_h3]:[font-size:19pt]"
          }
        >
          <div>
            <span
              className={
                "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] font-medium leading-[1.6] uppercase text-muted-foreground project-category [font-size:9px] tracking-[0.07em] max-[800.01px]:[font-size:8px] max-[480.01px]:[font-size:9px]"
              }
            >
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
            className={
              "project-round-link w-9 h-9 [border:1px_solid_var(--border)] rounded-[50%] grid [place-items:center] shrink-0 hover:text-primary hover:[border-color:var(--primary)] print:hidden!"
            }
            href={projectPath(locale, project.slug)}
            aria-label={`${copy.caseStudy}: ${project.title}`}
          >
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <p>{project.summary[locale]}</p>
        {large && project.features[locale].length > 0 && (
          <ul
            className={
              "project-highlights grid gap-2.5 m-[22px_0_0] p-0 list-none [&_li]:flex [&_li]:gap-[9px] [&_li]:[font-size:11px] [&_li]:leading-[1.7] [&_li]:text-muted-foreground [&_svg]:text-primary [&_svg]:shrink-0 [&_svg]:mt-[3px] print:hidden"
            }
          >
            {project.features[locale].slice(0, 3).map((feature) => (
              <li key={feature}>
                <Check size={14} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div
          className={
            "tech-list flex items-center flex-wrap gap-1.5 mt-5 max-[800.01px]:gap-[5px] print:mt-2"
          }
        >
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className={
                "tech-badge [font-family:ui-monospace,_monospace] [font-size:9px] font-normal p-[5px_9px] h-auto text-muted-foreground rounded-[5px] [border-color:var(--border)] max-[800.01px]:[font-size:8px] max-[800.01px]:p-[5px_7px] max-[480.01px]:[font-size:9px]"
              }
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div
          className={
            "project-actions flex flex-wrap items-center gap-5 mt-6 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-2 [&_a]:[font-size:10px] [&_a]:[font-weight:650] [&_a]:min-h-8 [&_a:first-child]:text-primary [&_a:hover]:underline [&_a:hover]:[text-underline-offset:4px] max-[800.01px]:gap-[15px] print:mt-2 print:[&_a]:[font-size:8pt]"
          }
        >
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
