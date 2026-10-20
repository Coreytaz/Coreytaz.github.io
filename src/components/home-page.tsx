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
    <div className="hero-visual hero-workspace" aria-hidden="true">
      <div className="workspace-backplate" />
      <TiltedCard
        className="hero-tilt"
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
        <div className="workspace-surface" />
        <div className="workspace-chrome">
          <span className="workspace-dots">
            <i />
            <i />
            <i />
          </span>
          <span>interface.tsx</span>
          <CodeXml size={15} />
        </div>
        <div className="workspace-grid" />
        <TiltedCardLayer depth={10} className="workspace-orbits">
          <span />
          <span />
        </TiltedCardLayer>
        <TiltedCardLayer depth={30} className="workspace-react">
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
          <span className="workspace-tag workspace-tag-react">
            <span>✳</span>React
          </span>
          <span className="workspace-tag workspace-tag-typescript">
            <b>TS</b>TypeScript
          </span>
        </TiltedCardLayer>
        <TiltedCardLayer depth={20} className="workspace-preview">
          <span>&lt;Interface /&gt;</span>
          <div>
            <i />
            <i />
            <i />
          </div>
        </TiltedCardLayer>
        <div className="workspace-footer">
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
          <div className="hero-stage">
            <HeroBackground />
            <section
              className="hero container"
              id="top"
              aria-labelledby="hero-title"
            >
              <div className="hero-copy">
                <p className="eyebrow hero-eyebrow">
                  <span className="blue-dot" />
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
                <p className="hero-intro">{portfolio.profile.intro[locale]}</p>
                <div className="hero-actions">
                  <StarBorder
                    as="a"
                    className="action-primary"
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
                    className="action-text"
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
              <div className="hero-bottom">
                <a href="#work">
                  <ArrowDown size={15} aria-hidden="true" />
                  {copy.scroll}
                </a>
                <span className="eyebrow">
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
            className="work-section container section-space"
            id="work"
            aria-labelledby="work-title"
          >
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">{copy.workEyebrow}</p>
                <h2 id="work-title">{copy.workTitle}</h2>
              </div>
              <p className="section-intro">{copy.workIntro}</p>
            </div>
            <div className="work-grid">
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
              <div className="other-work">
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
            <div className="work-end">
              <span className="small-dot" />
              <span>
                {String(featuredProjects.length).padStart(2, "0")}{" "}
                {copy.projectCount}
              </span>
              <span className="work-line" />
            </div>
          </section>
          <section
            className="about-section section-space"
            id="about"
            aria-labelledby="about-title"
          >
            <div className="container">
              <div className="about-grid" data-reveal>
                <div>
                  <p className="eyebrow">{copy.aboutEyebrow}</p>
                  <h2 id="about-title">{copy.aboutTitle}</h2>
                  <SpotlightCard
                    className="about-signature"
                    spotlightColor="var(--primary)"
                    intensity={0.16}
                    spotlightSize={300}
                    proximity={0}
                    flare={false}
                    aria-hidden="true"
                  >
                    <div className="signature-grid" />
                    <span className="signature-caption">
                      {portfolio.profile.name[locale]} /{" "}
                      {portfolio.profile.role[locale]}
                    </span>
                    <div className="about-monogram">
                      sb<span>✳</span>
                    </div>
                    <div className="signature-stack">
                      {stripTechnologies.slice(0, 3).map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                    <span className="signature-coordinate">01 — 02 — 03</span>
                  </SpotlightCard>
                </div>
                <div className="about-copy">
                  <p className="about-lead">
                    {portfolio.profile.about[locale]}
                  </p>
                  <p className="about-note">{copy.aboutNote}</p>
                  <a
                    className="action-text"
                    href={portfolio.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.github}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="skills-heading" data-reveal>
                <h3>{copy.skillsTitle}</h3>
                <p>{copy.skillsIntro}</p>
              </div>
              <div className="skills-grid">
                {portfolio.skills.map((skill, index) => {
                  const Icon = icons[index % icons.length];
                  return (
                    <article
                      key={skill.id}
                      className="skill-card-shell"
                      data-reveal
                      data-reveal-delay={index * 70}
                    >
                      <SpotlightCard
                        className={`skill-card skill-card-${index}`}
                        spotlightColor="var(--primary)"
                        spotlightSize={320}
                        intensity={0.12}
                        borderGlow={0.5}
                        proximity={65}
                        flare={false}
                      >
                        <div className="skill-card-top">
                          <Icon
                            size={24}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          <span className="eyebrow">0{index + 1}</span>
                        </div>
                        <div
                          className={`skill-illustration skill-illustration-${index}`}
                          aria-hidden="true"
                        >
                          {index === 0 ? (
                            <div className="skill-window">
                              <div className="window-chrome">
                                <i />
                                <i />
                                <i />
                              </div>
                              <div className="window-layout">
                                <span className="window-sidebar" />
                                <div>
                                  <span />
                                  <span />
                                  <span />
                                </div>
                              </div>
                              <span className="window-code">&lt;/&gt;</span>
                            </div>
                          ) : index === 1 ? (
                            <div className="skill-flow">
                              <span>API</span>
                              <i />
                              <span className="flow-hub">
                                <Layers3 size={26} />
                              </span>
                              <i />
                              <span>UI</span>
                              <div className="flow-packets">
                                <b />
                                <b />
                                <b />
                              </div>
                            </div>
                          ) : (
                            <div className="skill-server">
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
                              <div className="server-rail" />
                            </div>
                          )}
                        </div>
                        <h4>{skill.title[locale]}</h4>
                        <p>{skill.description[locale]}</p>
                        <div className="skill-technologies">
                          {skill.technologies.map((tech) => (
                            <Badge
                              variant="outline"
                              key={tech}
                              className="tech-badge"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="skill-evidence">
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
                  className="experience-section"
                  aria-labelledby="experience-title"
                >
                  <h3 id="experience-title">{copy.experienceTitle}</h3>
                  {portfolio.experience.map((item) => (
                    <article key={`${item.company}-${item.period[locale]}`}>
                      <span className="eyebrow">{item.period[locale]}</span>
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
            className="contact-section container section-space"
            id="contact"
            aria-labelledby="contact-title"
            data-reveal
          >
            <SpotlightCard
              className="contact-invitation"
              spotlightColor="var(--primary)"
              intensity={0.13}
              spotlightSize={500}
              proximity={0}
              flare={false}
            >
              <div className="contact-pattern" aria-hidden="true" />
              <p className="eyebrow">{copy.contactEyebrow}</p>
              <div className="contact-grid">
                <div>
                  <h2 id="contact-title">
                    {copy.contactTitle.split("\n").map((line, index) => (
                      <span key={line}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                    <span className="accent-dot">↗</span>
                  </h2>
                  <p>{copy.contactIntro}</p>
                </div>
                <Magnet
                  wrapperClassName="contact-magnet"
                  padding={45}
                  magnetStrength={5}
                  maxOffset={12}
                >
                  <a
                    className="contact-orb"
                    href={
                      portfolio.profile.email
                        ? `mailto:${portfolio.profile.email}`
                        : portfolio.profile.github
                    }
                    aria-label={
                      portfolio.profile.email ? copy.email : copy.contactAction
                    }
                  >
                    <span className="contact-orb-ring" aria-hidden="true" />
                    <ArrowUpRight
                      size={64}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </a>
                </Magnet>
              </div>
            </SpotlightCard>
            <div className="contact-links">
              {contactMethods.map(
                ({ label, detail, href, icon: Icon }, index) => (
                  <a
                    key={href}
                    href={href}
                    {...(href.startsWith("https:")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <div className="contact-link-top">
                      <span className="contact-link-icon">
                        <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="eyebrow">0{index + 1}</span>
                    </div>
                    <span className="contact-link-copy">
                      <strong>{label}</strong>
                      <span>{detail}</span>
                    </span>
                    <ArrowUpRight
                      className="contact-link-arrow"
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
