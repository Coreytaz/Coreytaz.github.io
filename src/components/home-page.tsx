import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Layers3,
  Database,
  CodeXml,
  Mail,
  Send,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { TechnologyStrip } from "@/components/technology-strip";
import { MotionView } from "@/components/motion-view";
import TiltedCard, {
  TiltedCardLayer,
} from "@/components/react-bits/TiltedCard";
import Magnet from "@/components/react-bits/Magnet";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import StarBorder from "@/components/react-bits/StarBorder";
import { HeroBackground } from "@/components/hero-background";
import {
  portfolio,
  featuredProjects,
  publishedProjects,
  projectPath,
  buildYear,
  stripTechnologies,
} from "@/lib/content";
import { structuredData } from "@/lib/seo";
import type { Locale } from "@/lib/content-schema";

function HeroVisual() {
  return (
    <div
      className={
        "hero-visual relative h-105 mt-5 [background-color:var(--art-bg)] [background-image:radial-gradient(var(--border)_1px,_transparent_1px)] [background-size:18px_18px] rounded-[50%_50%_14px_14px] overflow-hidden isolate [&.hero-workspace]:[background:transparent] [&.hero-workspace]:rounded-none [&.hero-workspace]:overflow-visible [&.hero-workspace]:h-110 [&.hero-workspace]:m-[20px_12px_0] [&.hero-workspace]:isolate [@media_(max-width:_1100px)_and_(min-width:_801px)]:[&.hero-workspace]:h-92.5 [@media_(max-width:_1100px)_and_(min-width:_801px)]:[&.hero-workspace]:mx-[0] max-[800.01px]:[&.hero-workspace]:h-87.5 max-[800.01px]:[&.hero-workspace]:w-[min(380px,_calc(100%_-_24px))] max-[800.01px]:[&.hero-workspace]:m-[42px_auto_0] min-[1600px]:h-112.5 max-[1100.01px]:h-[365px] max-[800.01px]:w-[min(380px,_100%)] max-[800.01px]:h-[335px] max-[800.01px]:m-[45px_auto_0] [html[data-motion='on']_&]:[animation:entry-visual_800ms_80ms_cubic-bezier(0.22,_1,_0.36,_1)_both] print:hidden! hero-workspace [&_.workspace-preview]:inset-[auto_28px_45px] [&_.workspace-preview]:p-[15px_18px] [&_.workspace-preview]:h-15.5 [&_.workspace-preview]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_20%,_var(--border))] [&_.workspace-preview]:rounded-[11px] [&_.workspace-preview]:[background:var(--background)] [&_.workspace-preview]:flex [&_.workspace-preview]:items-center [&_.workspace-preview]:gap-5 [@media_(max-width:_1100px)_and_(min-width:_801px)]:[&_.workspace-preview]:[inset-inline:14px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:[&_.workspace-preview]:gap-2.5 max-[800.01px]:[&_.workspace-preview]:[inset-inline:18px] max-[800.01px]:[&_.workspace-preview]:h-[53px] max-[800.01px]:[&_.workspace-preview]:gap-2.5"
      }
      aria-hidden="true"
    >
      <div
        className={
          "workspace-backplate absolute inset-[16px_8px_-6px] [transform:rotate(5deg)] [border:1px_solid_color-mix(in_srgb,_var(--primary)_20%,_var(--border))] rounded-[22px] [background:color-mix(in_srgb,_var(--primary)_4%,_var(--background))] z-[-1]"
        }
      />
      <TiltedCard
        className={String.raw`hero-tilt [&_.tilted-card\_\_front]:[border:1px_solid_var(--border)] [&_.tilted-card\_\_front]:[background:var(--art-bg)]`}
        containerHeight="100%"
        imageHeight="100%"
        imageWidth="100%"
        radius={22}
        rotateAmplitude={7}
        scaleOnHover={1.015}
        glare={0.2}
        glareColor="#91abff"
        shadow={0.15}
        parallax={1}
        intro={false}
        floating={false}
        showTooltip={false}
      >
        <div
          className={
            "workspace-surface absolute inset-0 [background:radial-gradient(_ellipse_at_50%_30%,_color-mix(in_srgb,_var(--primary)_12%,_transparent),_transparent_70%_)]"
          }
        />
        <div
          className={
            "workspace-chrome absolute inset-[0_0_auto] h-[45px] p-[0_20px] flex gap-4 items-center [border-bottom:1px_solid_var(--border)] text-muted-foreground [font:10px_ui-monospace,_monospace] [&_>_svg]:ml-auto [&_>_svg]:text-primary"
          }
        >
          <span
            className={
              "workspace-dots flex gap-[5px] [&_i]:w-[5px] [&_i]:h-[5px] [&_i]:rounded-[50%] [&_i]:[background:var(--primary)] [&_i]:opacity-[0.5]"
            }
          >
            <i />
            <i />
            <i />
          </span>
          <span>interface.tsx</span>
          <CodeXml size={15} />
        </div>
        <div
          className={
            "workspace-grid absolute inset-[46px_0_40px] [background-image:radial-gradient(_color-mix(in_srgb,_var(--primary)_20%,_transparent)_1px,_transparent_1px_)] [background-size:19px_19px] [mask-image:linear-gradient(transparent,_black_30%,_transparent)]"
          }
        />
        <TiltedCardLayer
          depth={10}
          className={
            "workspace-orbits grid [place-items:center] pb-[25px] [&_span]:absolute [&_span]:w-62.5 [&_span]:h-62.5 [&_span]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_12%,_transparent)] [&_span]:rounded-[50%] [&_span_+_span]:w-77.5 [&_span_+_span]:h-77.5 [&_span_+_span]:[border-style:dashed] [&_span_+_span]:opacity-[0.6] max-[800.01px]:[&_span]:w-52.5 max-[800.01px]:[&_span]:h-52.5 max-[800.01px]:[&_span_+_span]:w-[265px] max-[800.01px]:[&_span_+_span]:h-[265px]"
          }
        >
          <span />
          <span />
        </TiltedCardLayer>
        <TiltedCardLayer
          depth={30}
          className={
            "workspace-react grid [place-items:center] pb-[45px] text-primary [&_svg]:w-52.5 [&_svg]:h-[195px] [&_svg]:[filter:drop-shadow(_0_12px_20px_color-mix(in_srgb,_var(--primary)_15%,_transparent)_)] [@media_(max-width:_1100px)_and_(min-width:_801px)]:[&_svg]:w-[175px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:[&_svg]:h-[165px] max-[800.01px]:[&_svg]:w-42.5 max-[800.01px]:[&_svg]:h-40"
          }
        >
          <svg viewBox="-115 -105 230 210" fill="none">
            <g stroke="currentColor" strokeWidth="5">
              <ellipse rx="100" ry="38" />
              <ellipse rx="100" ry="38" transform="rotate(60)" />
              <ellipse rx="100" ry="38" transform="rotate(120)" />
            </g>
            <circle r="11" fill="currentColor" />
          </svg>
        </TiltedCardLayer>
        <TiltedCardLayer depth={48} className="workspace-layer-tags">
          <span
            className={
              "workspace-tag absolute flex items-center gap-[9px] p-[11px_15px] [border:1px_solid_var(--border)] rounded-[11px] [background:var(--background)] text-foreground [box-shadow:0_8px_20px_#0000000a] [font-size:12px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:[font-size:10px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:p-[9px] max-[800.01px]:[font-size:10px] max-[800.01px]:p-[9px_10px] workspace-tag-react top-[95px] left-[22px] [transform:rotate(-8deg)] [&_>_span]:[font-size:23px] [&_>_span]:text-primary [&_>_span]:leading-[1] [@media_(max-width:_1100px)_and_(min-width:_801px)]:left-[9px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:top-[75px] max-[800.01px]:left-[15px] max-[800.01px]:top-[65px]"
            }
          >
            <span>✳</span>React
          </span>
          <span
            className={
              "workspace-tag absolute flex items-center gap-[9px] p-[11px_15px] [border:1px_solid_var(--border)] rounded-[11px] [background:var(--background)] text-foreground [box-shadow:0_8px_20px_#0000000a] [font-size:12px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:[font-size:10px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:p-[9px] max-[800.01px]:[font-size:10px] max-[800.01px]:p-[9px_10px] workspace-tag-typescript bottom-[112px] right-[17px] [transform:rotate(6deg)] [&_b]:grid [&_b]:[place-items:center] [&_b]:h-6 [&_b]:w-6 [&_b]:[background:var(--primary)] [&_b]:text-primary-foreground [&_b]:rounded-[5px] [&_b]:[font:700_11px_ui-monospace,_monospace] [@media_(max-width:_1100px)_and_(min-width:_801px)]:right-[8px] [@media_(max-width:_1100px)_and_(min-width:_801px)]:bottom-[97px] max-[800.01px]:right-[12px] max-[800.01px]:bottom-[107px]"
            }
          >
            <b>TS</b>TypeScript
          </span>
        </TiltedCardLayer>
        <TiltedCardLayer
          depth={20}
          className={
            "workspace-preview [&_>_span]:[font:12px_ui-monospace,_monospace] [&_>_span]:text-primary [&_>_div]:flex [&_>_div]:gap-[5px] [&_>_div]:flex-[1] [&_i]:h-5 [&_i]:flex-[1] [&_i]:[background:color-mix(in_srgb,_var(--primary)_12%,_transparent)] [&_i]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_12%,_transparent)] [&_i]:rounded-[4px] max-[800.01px]:[&_>_span]:[font-size:10px]"
          }
        >
          <span>&lt;Interface /&gt;</span>
          <div>
            <i />
            <i />
            <i />
          </div>
        </TiltedCardLayer>
        <div
          className={
            "workspace-footer absolute bottom-[18px] [inset-inline:24px] flex justify-between text-muted-foreground [font:8px_ui-monospace,_monospace] tracking-[0.06em] [&_>_span:last-child]:flex [&_>_span:last-child]:items-center [&_>_span:last-child]:gap-[7px] [&_i]:w-1 [&_i]:h-1 [&_i]:[background:var(--primary)] [&_i]:rounded-[50%]"
          }
        >
          <span>COMPONENT / UI</span>
          <span>
            SB — 01 <i />
          </span>
        </div>
      </TiltedCard>
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = portfolio.copy[locale];
  const icons = [Code2, Layers3, Database];
  const contactMethods = [
    ...(portfolio.profile.email
      ? [
          {
            label: copy.email,
            detail: portfolio.profile.email,
            href: `mailto:${portfolio.profile.email}`,
            icon: Mail,
          },
        ]
      : []),
    ...(portfolio.profile.telegram
      ? [
          {
            label: copy.telegram,
            detail: new URL(portfolio.profile.telegram).pathname.replace(
              "/",
              "@",
            ),
            href: portfolio.profile.telegram,
            icon: Send,
          },
        ]
      : []),
    ...(portfolio.profile.resume
      ? [
          {
            label: copy.resume,
            detail: "hh.ru",
            href: portfolio.profile.resume,
            icon: FileText,
          },
        ]
      : []),
    {
      label: copy.github,
      detail: new URL(portfolio.profile.github).pathname.slice(1),
      href: portfolio.profile.github,
      icon: CodeXml,
    },
  ];
  const nonFeatured = publishedProjects.filter((project) => !project.featured);
  return (
    <SiteShell locale={locale}>
      <MotionView name="portfolio-page">
        <main id="content">
          <div
            className={
              "hero-stage relative isolate overflow-clip [&_>_.hero]:relative [&_>_.hero]:z-[1]"
            }
          >
            <HeroBackground />
            <section
              className={
                "hero pt-19.5 grid grid-cols-[1.4fr_1fr] gap-7.5 items-center [&_h1]:[font-size:clamp(48px,_5.45vw,_78px)] [&_h1]:tracking-[-0.065em] [&_h1]:[font-weight:650] [&_h1]:leading-[1.075] [&_h1_>_span]:text-primary min-[1600px]:pt-25 max-[1100.01px]:grid-cols-[1.35fr_1fr] max-[800.01px]:pt-12.5 max-[800.01px]:grid-cols-[1fr] max-[800.01px]:gap-0 max-[800.01px]:[&_h1]:[font-size:clamp(46px,_8.5vw,_72px)] max-[480.01px]:[&_h1]:[font-size:clamp(39px,_10.7vw,_51px)] [html[data-motion='on']_&_h1]:[animation:entry-rise_620ms_70ms_cubic-bezier(0.22,_1,_0.36,_1)_both] print:block print:pt-[15px] print:[&_h1]:[font-size:32pt] print:[&_h1_>_span_>_br]:hidden container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full"
              }
              id="top"
              aria-labelledby="hero-title"
            >
              <div className="hero-copy">
                <p
                  className={
                    "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] font-medium leading-[1.6] uppercase text-muted-foreground hero-eyebrow flex items-center gap-[9px] mb-7.5 [font-size:10px] tracking-[0.1em] max-[800.01px]:mb-[25px] max-[800.01px]:[font-size:9px] [html[data-motion='on']_&]:[animation:entry-rise_540ms_cubic-bezier(0.22,_1,_0.36,_1)_both]"
                  }
                >
                  <span
                    className={
                      "blue-dot inline-block w-1.5 h-1.5 [background:var(--primary)] rounded-[100%] shrink-0"
                    }
                  />
                  {copy.heroEyebrow}
                </p>
                <h1 id="hero-title">
                  {copy.heroLine1}
                  <br />
                  <span>
                    {copy.heroLine2}
                    <br />
                    {copy.heroLine3}
                  </span>
                </h1>
                <p
                  className={
                    "hero-intro max-w-[460px] text-muted-foreground [font-size:15px] leading-[1.85] mt-7.5 max-[800.01px]:max-w-[540px] max-[800.01px]:[font-size:14px] max-[800.01px]:mt-[25px] [html[data-motion='on']_&]:[animation:entry-rise_620ms_150ms_cubic-bezier(0.22,_1,_0.36,_1)_both] print:max-w-[none] print:[font-size:10pt]"
                  }
                >
                  {portfolio.profile.intro[locale]}
                </p>
                <div
                  className={
                    "hero-actions flex items-center flex-wrap gap-7.5 mt-8 max-[480.01px]:gap-[23px] [html[data-motion='on']_&]:[animation:entry-rise_620ms_230ms_cubic-bezier(0.22,_1,_0.36,_1)_both] print:mt-[15px]"
                  }
                >
                  <StarBorder
                    as="a"
                    className={
                      "action-primary inline-flex items-center justify-center gap-6 p-[16px_22px] [background:var(--primary)] text-primary-foreground rounded-[7px] [font-size:12px] [font-weight:650] min-h-12.5 [transition:transform_0.2s,_filter_0.2s] hover:[transform:translateY(-2px)] hover:[filter:brightness(1.08)] [html[data-motion='off']_&:hover]:[transform:none] print:[background:transparent] print:[color:#2547b1] print:p-0 print:min-h-6"
                    }
                    href="#work"
                    radius={7}
                    duration={5}
                    thickness={1.5}
                    color="#ffffff"
                    trailColor="#b7ccff"
                    backgroundColor="var(--primary)"
                    textColor="var(--primary-foreground)"
                    borderColor="color-mix(in srgb, var(--primary-foreground) 20%, transparent)"
                    hover="brighten"
                    clickPulse={false}
                  >
                    {copy.viewWork}
                    <ArrowDown size={18} aria-hidden="true" />
                  </StarBorder>
                  <a
                    className={
                      "action-text inline-flex items-center gap-[9px] min-h-11 [font-size:12px] [font-weight:650] hover:text-primary"
                    }
                    href={portfolio.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CodeXml size={18} aria-hidden="true" />
                    {copy.github}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <HeroVisual />
              <div
                className={
                  "hero-bottom col-[1_/_-1] flex items-center justify-between pt-9 pb-8.5 mt-7 [&_>_a]:inline-flex [&_>_a]:items-center [&_>_a]:gap-2.5 [&_>_a]:[font-size:10px] [&_>_a]:text-muted-foreground [&_.eyebrow]:[font-size:9px] max-[800.01px]:pt-7 max-[800.01px]:pb-6 max-[800.01px]:mt-2.5 max-[480.01px]:[&_>_a]:[font-size:9px] max-[480.01px]:[&_>_.eyebrow]:[font-size:8px] max-[480.01px]:[&_>_.eyebrow]:tracking-[0.02em] [html[data-motion='on']_&]:[animation:entry-rise_540ms_300ms_cubic-bezier(0.22,_1,_0.36,_1)_both] print:hidden!"
                }
              >
                <a href="#work">
                  <ArrowDown size={15} aria-hidden="true" />
                  {copy.scroll}
                </a>
                <span
                  className={
                    "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                  }
                >
                  {copy.indexLabel} / {buildYear}
                </span>
              </div>
            </section>
          </div>
          <TechnologyStrip
            technologies={stripTechnologies}
            labels={{
              title: copy.stripTitle,
            }}
          />
          <section
            className={
              "work-section container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full section-space py-28 max-[800.01px]:py-18 print:py-7"
            }
            id="work"
            aria-labelledby="work-title"
          >
            <div
              className={
                "section-heading flex justify-between gap-12 [align-items:end] mb-11.5 [&_h2]:[font-size:clamp(30px,_3.15vw,_44px)] [&_h2]:tracking-[-0.055em] [&_h2]:leading-[1.2] [&_h2]:font-semibold [&_h2]:mt-[17px] max-[800.01px]:flex-col max-[800.01px]:[align-items:start] max-[800.01px]:gap-5 max-[800.01px]:mb-7.5 print:mb-5 print:[&_h2]:[font-size:24pt]"
              }
              data-reveal
            >
              <div>
                <p
                  className={
                    "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                  }
                >
                  {copy.workEyebrow}
                </p>
                <h2 id="work-title">{copy.workTitle}</h2>
              </div>
              <p
                className={
                  "section-intro [font-size:13px] leading-[1.8] text-muted-foreground max-w-[310px] max-[800.01px]:max-w-[440px]"
                }
              >
                {copy.workIntro}
              </p>
            </div>
            <div
              className={
                "work-grid grid grid-cols-[1fr_1fr] gap-[48px_30px] max-[800.01px]:gap-[38px_22px] max-[480.01px]:grid-cols-[1fr] max-[480.01px]:gap-9.5 print:block"
              }
            >
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  index={index}
                  large={index === 0}
                />
              ))}
            </div>
            {nonFeatured.length > 0 && (
              <div
                className={
                  "other-work grid grid-cols-[1fr_1fr] gap-7.5 mt-15 [&_>_h3]:col-[1_/_-1] [&_>_h3]:[font-size:24px] max-[480.01px]:grid-cols-[1fr]"
                }
              >
                <h3>{copy.allProjects}</h3>
                {nonFeatured.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    locale={locale}
                    index={featuredProjects.length + index}
                  />
                ))}
              </div>
            )}
            <div
              className={
                "work-end flex items-center gap-2.5 mt-[45px] [font:10px_ui-monospace,_monospace] text-muted-foreground [&_.small-dot]:w-1 [&_.small-dot]:h-1 print:hidden"
              }
            >
              <span
                className={
                  "small-dot inline-block w-1.5 h-1.5 [background:var(--primary)] rounded-[100%] shrink-0"
                }
              />
              <span>
                {String(featuredProjects.length).padStart(2, "0")}{" "}
                {copy.projectCount}
              </span>
              <span
                className={
                  "work-line h-[1px] [background:var(--border)] flex-[1] ml-3"
                }
              />
            </div>
          </section>
          <section
            className={
              "about-section [background:var(--muted)] print:[background:white] section-space py-28 max-[800.01px]:py-18 print:py-7"
            }
            id="about"
            aria-labelledby="about-title"
          >
            <div
              className={
                "container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full"
              }
            >
              <div
                className={
                  "about-grid [&_h2]:[font-size:clamp(30px,_3.15vw,_44px)] [&_h2]:tracking-[-0.055em] [&_h2]:leading-[1.2] [&_h2]:font-semibold [&_h2]:mt-[17px] [&_h2]:max-w-[400px] grid grid-cols-[1fr_1fr] gap-20 max-[1100.01px]:gap-10 max-[800.01px]:grid-cols-[1fr] max-[800.01px]:gap-[25px] print:[&_h2]:[font-size:24pt] print:grid-cols-[1fr_1.5fr] print:gap-[25px]"
                }
                data-reveal
              >
                <div>
                  <p
                    className={
                      "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                    }
                  >
                    {copy.aboutEyebrow}
                  </p>
                  <h2 id="about-title">{copy.aboutTitle}</h2>
                  <SpotlightCard
                    className={
                      "about-signature [&.spotlight-card]:mt-7.5 [&.spotlight-card]:max-w-[400px] [&.spotlight-card]:min-h-52.5 [&.spotlight-card]:p-[24px_28px] [&.spotlight-card]:[border:1px_solid_var(--border)] [&.spotlight-card]:rounded-[20px] [&.spotlight-card]:[background:var(--background)] [&.spotlight-card]:[box-shadow:none] [&_.about-monogram]:flex [&_.about-monogram]:mt-3 [&_.about-monogram]:[font-size:90px] [&_.about-monogram_>_span]:ml-auto [&_.about-monogram_>_span]:[font-size:100px] max-[800.01px]:[&.spotlight-card]:max-w-[none] print:hidden!"
                    }
                    spotlightColor="var(--primary)"
                    intensity={0.16}
                    spotlightSize={300}
                    proximity={0}
                    flare={false}
                    aria-hidden="true"
                  >
                    <div
                      className={
                        "signature-grid absolute inset-0 z-[-1] [background-image:radial-gradient(_color-mix(in_srgb,_var(--primary)_22%,_transparent)_1px,_transparent_1px_)] [background-size:18px_18px] [mask-image:linear-gradient(110deg,_transparent,_black)]"
                      }
                    />
                    <span
                      className={
                        "signature-caption [font-family:var(--font-mono)] [font-size:8px] tracking-[0.12em] text-muted-foreground block max-w-[100%] leading-[1.5] uppercase"
                      }
                    >
                      {portfolio.profile.name[locale]} /{" "}
                      {portfolio.profile.role[locale]}
                    </span>
                    <div
                      className={
                        "about-monogram inline-flex items-center [font-size:95px] leading-[1] [font-weight:750] tracking-[-0.09em] mt-7 [&_>_span]:ml-4.5 [&_>_span]:text-primary [&_>_span]:[font-size:90px] [&_>_span]:font-normal [&_>_span]:[transform:rotate(15deg)] max-[800.01px]:hidden print:hidden!"
                      }
                    >
                      sb<span>✳</span>
                    </div>
                    <div
                      className={
                        "signature-stack flex gap-[7px] mt-[17px] [&_span]:[font-size:9px] [&_span]:p-[4px_8px] [&_span]:[border:1px_solid_var(--border)] [&_span]:rounded-[5px] [&_span]:[background:var(--muted)]"
                      }
                    >
                      {stripTechnologies.slice(0, 3).map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                    <span
                      className={
                        "signature-coordinate [font-family:var(--font-mono)] [font-size:7px] tracking-[0.12em] text-muted-foreground absolute right-[22px] bottom-[28px]"
                      }
                    >
                      01 — 02 — 03
                    </span>
                  </SpotlightCard>
                </div>
                <div
                  className={
                    "about-copy [border-left:1px_solid_var(--border)] pl-9.5 pt-7.5 [&_.about-lead]:[font-size:clamp(17px,_1.5vw,_21px)] [&_.about-lead]:leading-[1.75] max-[800.01px]:pl-[0] max-[800.01px]:[border-left:0] max-[800.01px]:pt-[0] [&_.action-text]:mt-4.5 print:pt-[0] print:[border-left:0] print:pl-[0]"
                  }
                >
                  <p
                    className={
                      "about-lead [font-size:17px] leading-[1.85] tracking-[-0.025em] max-[800.01px]:[font-size:16px] print:[font-size:10pt]"
                    }
                  >
                    {portfolio.profile.about[locale]}
                  </p>
                  <p
                    className={
                      "about-note [font-size:12px] leading-[1.8] text-muted-foreground mt-5.5"
                    }
                  >
                    {copy.aboutNote}
                  </p>
                  <a
                    className={
                      "action-text inline-flex items-center gap-[9px] min-h-11 [font-size:12px] [font-weight:650] hover:text-primary"
                    }
                    href={portfolio.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.github}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div
                className={
                  "skills-heading flex [align-items:baseline] justify-between gap-7.5 mt-20 mb-[25px] [&_h3]:[font-size:23px] [&_h3]:font-semibold [&_h3]:tracking-[-0.04em] [&_p]:[font-size:11px] [&_p]:text-muted-foreground max-[800.01px]:flex-col max-[800.01px]:gap-[13px] max-[800.01px]:mt-[45px] print:mt-6"
                }
                data-reveal
              >
                <h3>{copy.skillsTitle}</h3>
                <p>{copy.skillsIntro}</p>
              </div>
              <div
                className={
                  "skills-grid grid grid-cols-[repeat(3,_1fr)] gap-[17px] max-[800.01px]:grid-cols-[1fr] max-[800.01px]:gap-3.5 print:grid-cols-[repeat(3,_1fr)] print:gap-3"
                }
              >
                {portfolio.skills.map((skill, index) => {
                  const Icon = icons[index % icons.length];
                  return (
                    <article
                      key={skill.id}
                      className={
                        "skill-card-shell min-w-[0] flex print:block print:[break-inside:avoid]"
                      }
                      data-reveal
                      data-reveal-delay={index * 70}
                    >
                      <SpotlightCard
                        className={String.raw`skill-card [&.spotlight-card]:w-full [&.spotlight-card]:rounded-[18px] [&.spotlight-card]:[background:var(--background)] [&.spotlight-card]:[box-shadow:none] [background:var(--background)] [border:1px_solid_var(--border)] p-7 rounded-[9px] flex flex-col [&_h4]:[font-size:17px] [&_h4]:leading-[1.5] [&_h4]:[font-weight:650] [&_h4]:tracking-[-0.025em] [&_>_p]:[font-size:12px] [&_>_p]:leading-[1.8] [&_>_p]:text-muted-foreground [&_>_p]:mt-3 max-[1100.01px]:p-5.5 max-[800.01px]:p-[25px] print:p-[15px] print:[break-inside:avoid] print:[&_h4]:[font-size:11pt] print:[&_>_p]:[font-size:8pt] print:[&.spotlight-card]:rounded-none skill-card- ${index}`}
                        spotlightColor="var(--primary)"
                        spotlightSize={320}
                        intensity={0.12}
                        borderGlow={0.5}
                        proximity={65}
                        flare={false}
                      >
                        <div
                          className={
                            "skill-card-top [&_>_svg]:p-[9px] [&_>_svg]:w-10.5 [&_>_svg]:h-10.5 [&_>_svg]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_22%,_transparent)] [&_>_svg]:rounded-[12px] [&_>_svg]:[background:color-mix(in_srgb,_var(--primary)_7%,_transparent)] flex items-center justify-between text-primary mb-7.5 [&_>_span]:[font-size:9px] max-[800.01px]:mb-5 print:mb-3"
                          }
                        >
                          <Icon
                            size={24}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          <span
                            className={
                              "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                            }
                          >
                            0{index + 1}
                          </span>
                        </div>
                        <div
                          className={String.raw`skill-illustration h-35 m-[-5px_0_24px] grid [place-items:center] relative text-primary [background:radial-gradient(_ellipse,_color-mix(in_srgb,_var(--primary)_8%,_transparent),_transparent_70%_)] max-[800.01px]:h-[125px] print:hidden! skill-illustration- ${index}`}
                          aria-hidden="true"
                        >
                          {index === 0 ? (
                            <div
                              className={
                                "skill-window w-[80%] max-w-[235px] h-28 [border:1px_solid_color-mix(in_srgb,_var(--primary)_35%,_var(--border))] rounded-[9px] [background:var(--muted)] [box-shadow:10px_10px_0_color-mix(in_srgb,_var(--primary)_4%,_transparent)] relative [transform:rotate(-4deg)]"
                              }
                            >
                              <div
                                className={
                                  "window-chrome flex gap-1 p-[9px] [border-bottom:1px_solid_var(--border)] [&_i]:w-1 [&_i]:h-1 [&_i]:rounded-[50%] [&_i]:[background:currentColor] [&_i]:opacity-[0.5]"
                                }
                              >
                                <i />
                                <i />
                                <i />
                              </div>
                              <div
                                className={
                                  "window-layout grid grid-cols-[25%_1fr] h-17 p-2.5 gap-2.5 [&_>_div]:grid [&_>_div]:grid-cols-[1fr_1fr] [&_>_div]:gap-1.5 [&_>_div_span]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_20%,_transparent)] [&_>_div_span]:rounded-[3px] [&_>_div_span:first-child]:col-[span_2] [&_>_div_span:first-child]:[background:color-mix(in_srgb,_var(--primary)_8%,_transparent)]"
                                }
                              >
                                <span
                                  className={
                                    "window-sidebar rounded-[3px] [background:color-mix(in_srgb,_var(--primary)_16%,_transparent)]"
                                  }
                                />
                                <div>
                                  <span />
                                  <span />
                                  <span />
                                </div>
                              </div>
                              <span
                                className={
                                  "window-code absolute bottom-[-10px] right-[-13px] [border:1px_solid_var(--border)] rounded-[8px] p-[6px_11px] [background:var(--background)] [font-family:monospace] [font-size:18px]"
                                }
                              >
                                &lt;/&gt;
                              </span>
                            </div>
                          ) : index === 1 ? (
                            <div
                              className={
                                "skill-flow flex items-center justify-center w-full relative [&_>_span]:grid [&_>_span]:[place-items:center] [&_>_span]:shrink-0 [&_>_span]:w-13 [&_>_span]:h-13 [&_>_span]:[background:var(--muted)] [&_>_span]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_30%,_var(--border))] [&_>_span]:rounded-[12px] [&_>_span]:[font-family:monospace] [&_>_span]:[font-size:11px] [&_>_.flow-hub]:w-17.5 [&_>_.flow-hub]:h-17.5 [&_>_.flow-hub]:rounded-[50%] [&_>_.flow-hub]:[box-shadow:0_0_0_8px_color-mix(in_srgb,_var(--primary)_5%,_transparent)] [&_>_i]:w-7.5 [&_>_i]:h-[1px] [&_>_i]:[background:color-mix(in_srgb,_var(--primary)_35%,_transparent)]"
                              }
                            >
                              <span>API</span>
                              <i />
                              <span className="flow-hub">
                                <Layers3 size={26} />
                              </span>
                              <i />
                              <span>UI</span>
                              <div
                                className={
                                  "flow-packets absolute inset-[50%_17%] flex justify-between pointer-events-none [&_b]:w-1 [&_b]:h-1 [&_b]:mt-[-2px] [&_b]:rounded-[50%] [&_b]:[background:var(--primary)]"
                                }
                              >
                                <b />
                                <b />
                                <b />
                              </div>
                            </div>
                          ) : (
                            <div
                              className={
                                "skill-server flex items-center justify-center w-full relative [&_>_span]:grid [&_>_span]:[place-items:center] [&_>_span]:shrink-0 [&_>_span]:w-13 [&_>_span]:h-13 [&_>_span]:[background:var(--muted)] [&_>_span]:[border:1px_solid_color-mix(in_srgb,_var(--primary)_30%,_var(--border))] [&_>_span]:rounded-[12px] [&_>_span]:[font-family:monospace] [&_>_span]:[font-size:11px] [&_>_i]:w-7.5 [&_>_i]:h-[1px] [&_>_i]:[background:color-mix(in_srgb,_var(--primary)_35%,_transparent)] [&_>_span:nth-of-type(2)]:h-19 [&_>_span:nth-of-type(2)]:w-16.5 [&_>_span:nth-of-type(2)]:[box-shadow:0_6px_0_-2px_var(--background),_0_7px_0_-2px_color-mix(in_srgb,_var(--primary)_30%,_var(--border))]"
                              }
                            >
                              <span>
                                <CodeXml size={22} />
                              </span>
                              <i />
                              <span>
                                <Database size={27} />
                              </span>
                              <i />
                              <span>
                                <Layers3 size={22} />
                              </span>
                              <div
                                className={
                                  "server-rail absolute top-[calc(100%_+_15px)] left-[25%] right-[25%] h-2.5 [border:1px_dashed_color-mix(in_srgb,_var(--primary)_30%,_transparent)] border-t-0! rounded-[0_0_10px_10px]"
                                }
                              />
                            </div>
                          )}
                        </div>
                        <h4>{skill.title[locale]}</h4>
                        <p>{skill.description[locale]}</p>
                        <div
                          className={
                            "skill-technologies flex items-center flex-wrap gap-1.5 my-[20px_25px] max-[800.01px]:my-4.5 print:my-2.5"
                          }
                        >
                          {skill.technologies.map((tech) => (
                            <Badge
                              variant="outline"
                              key={tech}
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
                            "skill-evidence flex gap-3.5 pt-[15px] [border-top:1px_solid_var(--border)] mt-auto flex-wrap [&_a]:inline-flex [&_a]:items-center [&_a]:gap-1 [&_a]:[font-size:9px] [&_a]:text-primary [&_a]:min-h-6"
                          }
                        >
                          {skill.projects
                            .filter((slug) =>
                              publishedProjects.some(
                                (project) => project.slug === slug,
                              ),
                            )
                            .map((slug) => {
                              const project = publishedProjects.find(
                                (item) => item.slug === slug,
                              )!;
                              return (
                                <Link
                                  key={slug}
                                  href={projectPath(locale, slug)}
                                  aria-label={`${copy.relatedProjects}: ${project.title}`}
                                >
                                  {project.title}
                                  <ArrowUpRight size={13} aria-hidden="true" />
                                </Link>
                              );
                            })}
                        </div>
                      </SpotlightCard>
                    </article>
                  );
                })}
              </div>
              {portfolio.experience.length > 0 && (
                <section
                  className={
                    "experience-section mt-[65px] [&_h3]:[font-size:25px] [&_h3]:mb-5 [&_article]:p-[24px_0] [&_article]:[border-top:1px_solid_var(--border)] [&_h4]:my-2.5 [&_article_>_p]:[font-size:14px] [&_article_>_p]:leading-[1.7] [&_article_>_p]:text-muted-foreground"
                  }
                  aria-labelledby="experience-title"
                >
                  <h3 id="experience-title">{copy.experienceTitle}</h3>
                  {portfolio.experience.map((item) => (
                    <article key={`${item.company}-${item.period[locale]}`}>
                      <span
                        className={
                          "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                        }
                      >
                        {item.period[locale]}
                      </span>
                      <h4>
                        {item.role[locale]} · {item.company}
                      </h4>
                      <p>{item.description[locale]}</p>
                    </article>
                  ))}
                </section>
              )}
            </div>
          </section>
          <section
            className={
              "contact-section  [&_h2]:tracking-[-0.055em] [&_h2]:leading-[1.25] [&_h2]:font-semibold [&_h2]:mt-[17px] [&_h2]:max-w-[800px] [&_h2_>_.accent-dot]:ml-2.5 max-[800.01px]:[&_h2]:[font-size:35px] max-[480.01px]:[&_h2]:[font-size:34px] max-[480.01px]:[&_h2_.accent-dot]:hidden print:[&_h2]:[font-size:24pt] print:[break-inside:avoid] container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full section-space py-28 max-[800.01px]:py-18 print:py-7"
            }
            id="contact"
            aria-labelledby="contact-title"
            data-reveal
          >
            <SpotlightCard
              className={
                "contact-invitation [&.spotlight-card]:p-[clamp(28px,_4vw,_52px)] [&.spotlight-card]:[border:1px_solid_var(--border)] [&.spotlight-card]:rounded-[24px] [&.spotlight-card]:[background:var(--muted)] [&.spotlight-card]:[box-shadow:none] [&_.contact-grid]:mt-5.5 [&_.contact-grid]:gap-[35px] [&_h2]:[font-size:clamp(32px,_4vw,_54px)] [&_.contact-grid_p]:max-w-[520px] max-[600.01px]:[&.spotlight-card]:p-[26px_23px] max-[600.01px]:[&.spotlight-card]:rounded-[18px] max-[600.01px]:[&_h2]:[font-size:31px] print:[&.spotlight-card]:[border:0] print:[&.spotlight-card]:p-0 print:[&.spotlight-card]:[background:transparent]"
              }
              spotlightColor="var(--primary)"
              intensity={0.13}
              spotlightSize={500}
              proximity={0}
              flare={false}
            >
              <div
                className={
                  "contact-pattern absolute inset-0 z-[-1] [background-image:radial-gradient(_color-mix(in_srgb,_var(--primary)_24%,_transparent)_1px,_transparent_1px_)] [background-size:22px_22px] [mask-image:linear-gradient(105deg,_transparent_40%,_black)] print:hidden!"
                }
                aria-hidden="true"
              />
              <p
                className={
                  "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                }
              >
                {copy.contactEyebrow}
              </p>
              <div
                className={
                  "contact-grid grid grid-cols-[1fr_auto] items-center gap-15 mt-1.5 [&_p]:[font-size:13px] [&_p]:leading-[1.85] [&_p]:text-muted-foreground [&_p]:mt-6 [&_p]:max-w-[540px] max-[800.01px]:gap-5 max-[480.01px]:grid-cols-[1fr] max-[480.01px]:gap-[25px] print:block"
                }
              >
                <div>
                  <h2 id="contact-title">
                    {copy.contactTitle.split("\n").map((line, index) => (
                      <span key={line}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                    <span className={"accent-dot text-primary"}>↗</span>
                  </h2>
                  <p>{copy.contactIntro}</p>
                </div>
                <Magnet
                  wrapperClassName={
                    "contact-magnet m-5 max-[600.01px]:hidden! print:hidden!"
                  }
                  padding={45}
                  magnetStrength={5}
                  maxOffset={12}
                >
                  <a
                    className={
                      "contact-orb w-35 h-35 rounded-[100%] [background:var(--primary)] text-primary-foreground grid [place-items:center] [transition:transform_0.3s] relative [box-shadow:0_0_70px_color-mix(in_srgb,_var(--primary)_15%,_transparent)] hover:[transform:rotate(8deg)] max-[800.01px]:w-20 max-[800.01px]:h-20 max-[800.01px]:[&_svg]:w-11 max-[800.01px]:[&_svg]:h-11 max-[480.01px]:hidden [html[data-motion='off']_&:hover]:[transform:none] print:hidden!"
                    }
                    href={
                      portfolio.profile.email
                        ? `mailto:${portfolio.profile.email}`
                        : portfolio.profile.github
                    }
                    aria-label={
                      portfolio.profile.email ? copy.email : copy.contactAction
                    }
                  >
                    <span
                      className={
                        "contact-orb-ring absolute inset-[-15px] [border:1px_solid_color-mix(in_srgb,_var(--primary)_25%,_transparent)] rounded-[50%] before:[content:''] before:absolute before:w-1.5 before:h-1.5 before:[background:var(--primary)] before:rounded-[50%] before:top-[20px] before:right-[20px]"
                      }
                      aria-hidden="true"
                    />
                    <ArrowUpRight
                      size={64}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </a>
                </Magnet>
              </div>
            </SpotlightCard>
            <div
              className={
                "contact-links grid flex-wrap gap-3.5 mt-4 grid-cols-[repeat(4,_minmax(0,_1fr))] [&_>_a]:flex [&_>_a]:gap-5.5 [&_>_a]:items-stretch [&_>_a]:[font-size:12px] [&_>_a]:[font-weight:650] [&_>_a]:min-h-[165px] [&_>_a]:flex-col [&_>_a]:relative [&_>_a]:min-w-[0] [&_>_a]:p-6 [&_>_a]:[border:1px_solid_var(--border)] [&_>_a]:rounded-[16px] [&_>_a]:[background:var(--background)] [&_>_a]:[transition:background_200ms,_border-color_200ms] [&_>_a:hover]:text-foreground [&_>_a:hover]:[border-color:color-mix(in_srgb,_var(--primary)_45%,_var(--border))] [&_>_a:hover]:[background:color-mix(in_srgb,_var(--primary)_4%,_var(--background))] [&_>_a:hover_.contact-link-arrow]:[transform:translate(2px,_-2px)] max-[1000.01px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[600.01px]:gap-2.5 max-[600.01px]:[&_>_a]:p-[17px] max-[600.01px]:[&_>_a]:gap-5 max-[600.01px]:[&_>_a]:min-h-[165px] print:flex print:flex-wrap print:[&_>_a]:p-0 print:[&_>_a]:[border:0] print:[&_>_a]:min-h-[0] print:[&_>_a]:[background:transparent]"
              }
            >
              {contactMethods.map(
                ({ label, detail, href, icon: Icon }, index) => (
                  <a
                    key={href}
                    href={href}
                    {...(href.startsWith("https:")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <div
                      className={
                        "contact-link-top flex items-center justify-between [&_>_.eyebrow]:text-muted-foreground [&_>_.eyebrow]:[font-size:8px] print:hidden!"
                      }
                    >
                      <span
                        className={
                          "contact-link-icon grid [place-items:center] w-9.5 h-9.5 rounded-[10px] [background:color-mix(in_srgb,_var(--primary)_8%,_transparent)] text-primary"
                        }
                      >
                        <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span
                        className={
                          "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
                        }
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <span
                      className={
                        "contact-link-copy grid gap-[7px] pr-3.5 [&_strong]:[font-size:13px] [&_strong]:font-semibold [&_>_span]:[font-size:10px] [&_>_span]:font-normal [&_>_span]:text-muted-foreground [&_>_span]:[overflow-wrap:anywhere] max-[600.01px]:[&_strong]:[font-size:12px] max-[600.01px]:pr-[0] max-[600.01px]:[&_>_span]:[font-size:9.5px]"
                      }
                    >
                      <strong>{label}</strong>
                      <span>{detail}</span>
                    </span>
                    <ArrowUpRight
                      className={
                        "contact-link-arrow absolute bottom-[28px] right-[20px] text-primary [transition:transform_200ms] max-[600.01px]:right-[13px] max-[600.01px]:bottom-[19px] max-[600.01px]:w-[15px] print:hidden!"
                      }
                      size={19}
                      aria-hidden="true"
                    />
                  </a>
                ),
              )}
            </div>
          </section>
        </main>
      </MotionView>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(locale)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </SiteShell>
  );
}
