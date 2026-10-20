import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { PrintButton } from "@/components/print-button";
import { portfolio, homePath, projectPath, buildYear } from "@/lib/content";
import type { Locale } from "@/lib/content-schema";

export function SiteShell({
  locale,
  slug,
  children,
}: {
  locale: Locale;
  slug?: string;
  children: ReactNode;
}) {
  const copy = portfolio.copy[locale];
  const alternate = locale === "ru" ? "en" : "ru";
  return (
    <>
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <Navigation
        locale={locale}
        homeHref={homePath(locale)}
        alternateHref={
          slug ? projectPath(alternate, slug) : homePath(alternate)
        }
        github={portfolio.profile.github}
        name={portfolio.profile.name[locale]}
        labels={{
          work: copy.navWork,
          about: copy.navAbout,
          contact: copy.navContact,
          menu: copy.navMenu,
          close: copy.navClose,
          theme: copy.theme,
          language: copy.language,
          home: copy.home,
        }}
      />
      {children}
      <footer className="site-footer container">
        <div className="footer-main">
          <Link className="footer-brand" href={homePath(locale)}>
            {portfolio.profile.name[locale]}
            <span className="accent-dot">.</span>
          </Link>
          <p>{copy.footerNote}</p>
          <a
            href={portfolio.profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {buildYear} {portfolio.profile.name[locale]}
          </span>
          <PrintButton label={copy.print} />
          <a href="#top">
            {copy.backTop}
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
