import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
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
import {
  portfolio,
  featuredProjects,
  publishedProjects,
  projectPath,
  buildYear,
} from "@/lib/content";
import { structuredData } from "@/lib/seo";
import type { Locale } from "@/lib/content-schema";

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-label">
        <span className="small-dot" /> REACT / TYPESCRIPT
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="hero-asterisk">
        <svg viewBox="0 0 240 240" fill="none">
          <path
            d="M104 12h32v65l46-46 23 23-46 46h65v32h-65l46 46-23 23-46-46v65h-32v-65l-46 46-23-23 46-46H16v-32h65L35 54l23-23 46 46V12Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="floating-tag tag-top">
        <span className="code-bracket">&lt;/&gt;</span> Frontend
      </span>
      <span className="floating-tag tag-bottom">
        <span className="react-dot">✳</span> React
      </span>
      <div className="visual-caption">
        <span>
          CREATIVE THINKING.
          <br />
          STRUCTURED CODE.
        </span>
        <span className="visual-index">SB / 01</span>
      </div>
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = portfolio.copy[locale];
  const icons = [Code2, Layers3, Database];
  const nonFeatured = publishedProjects.filter((project) => !project.featured);
  return (
    <SiteShell locale={locale}>
      <main id="content">
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
              <a className="action-primary" href="#work">
                {copy.viewWork}
                <ArrowDown size={18} aria-hidden="true" />
              </a>
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
        <div className="stack-strip" aria-hidden="true">
          <div className="container">
            <span>React</span>
            <span className="strip-star">✳</span>
            <span>TypeScript</span>
            <span className="strip-star">✳</span>
            <span>Next.js</span>
            <span className="strip-star">✳</span>
            <span>Redux Toolkit</span>
            <span className="strip-star">✳</span>
            <span>Socket.IO</span>
          </div>
        </div>
        <section
          className="work-section container section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
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
            <div className="about-grid">
              <div>
                <p className="eyebrow">{copy.aboutEyebrow}</p>
                <h2 id="about-title">{copy.aboutTitle}</h2>
                <div className="about-monogram" aria-hidden="true">
                  sb<span>✳</span>
                </div>
              </div>
              <div className="about-copy">
                <p className="about-lead">{portfolio.profile.about[locale]}</p>
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
            <div className="skills-heading">
              <h3>{copy.skillsTitle}</h3>
              <p>{copy.skillsIntro}</p>
            </div>
            <div className="skills-grid">
              {portfolio.skills.map((skill, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <article key={skill.id} className="skill-card">
                    <div className="skill-card-top">
                      <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                      <span className="eyebrow">0{index + 1}</span>
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
        >
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
            <a
              className="contact-orb"
              href={portfolio.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.contactAction}
            >
              <ArrowUpRight size={64} strokeWidth={1.25} aria-hidden="true" />
            </a>
          </div>
          <div className="contact-links">
            <a
              href={portfolio.profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeXml size={19} aria-hidden="true" />
              {copy.contactAction}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            {portfolio.profile.email && (
              <a href={`mailto:${portfolio.profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                {copy.email}
              </a>
            )}
            {portfolio.profile.telegram && (
              <a
                href={portfolio.profile.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={18} aria-hidden="true" />
                {copy.telegram}
              </a>
            )}
            {portfolio.profile.resume && (
              <a
                href={portfolio.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={18} aria-hidden="true" />
                {copy.resume}
              </a>
            )}
          </div>
        </section>
      </main>
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
