import { Badge } from "@/components/ui/badge";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { portfolio } from "@/lib/content";
import type { Locale } from "@/lib/content-schema";

export function ExperienceSection({ locale }: { locale: Locale }) {
  if (portfolio.experience.length === 0) return null;
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="experience-section container mx-auto w-[min(1240px,calc(100%_-_112px))] py-28 max-[1100px]:w-[calc(100%_-_72px)] max-[800px]:w-[calc(100%_-_48px)] max-[800px]:py-18 max-[480px]:w-[calc(100%_-_40px)] print:w-full print:py-7"
    >
      <div className="mb-12" data-reveal>
        <p className="mb-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          {locale === "ru" ? "Карьера / Frontend" : "Career / Frontend"}
        </p>
        <h2
          id="experience-title"
          className="text-[clamp(32px,4vw,48px)] leading-tight font-semibold tracking-[-0.055em] print:text-[24pt]"
        >
          {portfolio.copy[locale].experienceTitle}
          <span className="text-primary">.</span>
        </h2>
      </div>
      <ol className="relative space-y-8 border-l border-border pl-8 max-[600px]:pl-5 print:border-0 print:pl-0">
        {portfolio.experience.map((item, index) => (
          <li
            key={`${item.company}-${item.period.en}`}
            className="relative"
            data-reveal
          >
            <span
              aria-hidden="true"
              className="absolute top-10 -left-[38px] size-[11px] rounded-full border-2 border-background bg-primary max-[600px]:-left-[26px] print:hidden"
            />
            <article
              aria-labelledby={`experience-company-${index}`}
              className="print:break-inside-avoid"
            >
              <SpotlightCard
                className="experience-card [&.spotlight-card]:rounded-[20px] border border-border [&.spotlight-card]:bg-background [&.spotlight-card]:p-8 [&.spotlight-card]:shadow-none max-[600px]:[&.spotlight-card]:p-5 print:border-0 print:[&.spotlight-card]:p-0 print:[&.spotlight-card]:bg-transparent"
                spotlightColor="var(--primary)"
                intensity={0.13}
                spotlightSize={500}
                proximity={0}
                flare={false}
              >
                <p className="mb-4 font-mono text-[11px] leading-relaxed tracking-wide text-primary">
                  {item.period[locale]}
                </p>
                <h3
                  id={`experience-company-${index}`}
                  className="text-[clamp(21px,2.4vw,28px)] leading-snug font-semibold tracking-tight"
                >
                  {item.company}
                </h3>
                <p className="mt-2 text-sm font-medium">{item.role[locale]}</p>
                <p className="mt-5 max-w-[850px] text-sm leading-relaxed text-muted-foreground">
                  {item.description[locale]}
                </p>
                <ul className="mt-5 max-w-[900px] list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
                  {item.highlights[locale].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <ul
                  aria-label={portfolio.copy[locale].stack}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {item.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] font-normal"
                      >
                        {technology}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
