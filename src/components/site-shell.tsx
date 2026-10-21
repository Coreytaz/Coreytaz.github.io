import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Navigation } from "@/components/navigation";
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
      <a
        className={
          "skip-link fixed z-[100] top-[8px] left-[8px] p-[12px_20px] [background:var(--primary)] text-primary-foreground [transform:translateY(-160%)] rounded-[6px] [&:focus]:[transform:translateY(0)] print:hidden!"
        }
        href="#content"
      >
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
          motionEnable: copy.motionEnable,
          motionDisable: copy.motionDisable,
        }}
      />
      {children}
      <footer
        className={
          "site-footer [border-top:1px_solid_var(--border)] print:[break-inside:avoid] container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full"
        }
        data-reveal
      >
        <div
          className={
            "footer-main flex items-center justify-between gap-7.5 py-[35px] [&_>_p]:[font-size:10px] [&_>_p]:text-muted-foreground [&_>_a:last-child]:flex [&_>_a:last-child]:gap-2.5 [&_>_a:last-child]:items-center [&_>_a:last-child]:[font-size:11px] [&_>_a:last-child]:[font-weight:650] max-[800.01px]:flex-wrap max-[800.01px]:py-[25px] max-[800.01px]:gap-4.5 max-[800.01px]:[&_>_p]:[order:3] max-[800.01px]:[&_>_p]:w-full max-[800.01px]:[&_>_a:last-child]:ml-auto print:py-[15px]"
          }
        >
          <Link
            className={
              "footer-brand [font-size:17px] font-bold tracking-[-0.04em]"
            }
            href={homePath(locale)}
          >
            {portfolio.profile.name[locale]}
            <span className={"accent-dot text-primary"}>.</span>
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
        <div
          className={
            "footer-bottom flex items-center justify-between gap-5 py-5 [border-top:1px_solid_var(--border)] text-muted-foreground [font-size:9px] [&_>_a]:flex [&_>_a]:items-center [&_>_a]:gap-2 [&_>_a]:min-h-8 max-[800.01px]:gap-3 max-[480.01px]:flex-wrap max-[480.01px]:[font-size:8px] max-[480.01px]:[&_.print-button]:px-[0] max-[480.01px]:[&_.print-button]:[font-size:8px] print:[&_>_a]:hidden!"
          }
        >
          <span>
            © {buildYear} {portfolio.profile.name[locale]}
          </span>
          <a href="#top">
            {copy.backTop}
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
