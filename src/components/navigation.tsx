"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X, Play, Pause } from "lucide-react";
import PillNav from "@/components/react-bits/PillNav";

import { useMotion } from "@/components/motion-provider";
import { transitionLanguage } from "@/lib/language-transition";
import { transitionTheme } from "@/lib/theme-transition";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

type Labels = {
  work: string;
  experience: string;
  about: string;
  contact: string;
  menu: string;
  close: string;
  theme: string;
  language: string;
  home: string;
  motionEnable: string;
  motionDisable: string;
};

export function Navigation({
  locale,
  homeHref,
  alternateHref,
  github,
  name,
  labels,
}: {
  locale: "ru" | "en";
  homeHref: string;
  alternateHref: string;
  github: string;
  name: string;
  labels: Labels;
}) {
  const [open, setOpen] = useState(false);
  const pendingNavigation = useRef<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname.replace(/\/$/, "") === homeHref.replace(/\/$/, "");
  // Hash-only navigation belongs to the browser: a React transition snapshots
  // the page and turns its smooth scroll into a visible jump.
  const SectionLink = isHome ? "a" : Link;
  const { resolvedTheme, setTheme } = useTheme();
  const motion = useMotion();
  const links = [
    { href: `${homeHref}#work`, label: labels.work },
    { href: `${homeHref}#experience`, label: labels.experience },
    { href: `${homeHref}#about`, label: labels.about },
    { href: `${homeHref}#contact`, label: labels.contact },
  ];

  return (
    <header
      className={
        "site-header sticky top-0 z-[40] [background:var(--background)] [border-bottom:1px_solid_var(--border)] [view-transition-name:portfolio-header] print:hidden!"
      }
    >
      <div
        className={
          "container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full header-inner h-25 flex items-center justify-between gap-3 max-[800.01px]:h-20"
        }
      >
        <Link
          href={homeHref}
          className={
            "brand flex gap-[13px] items-center max-[480.01px]:gap-[9px]"
          }
          aria-label={`${name} — ${labels.home}`}
        >
          <span
            className={
              "brand-symbol [font-size:48px] font-extrabold tracking-[-0.1em] leading-[1] [&_span]:text-primary max-[800.01px]:[font-size:42px]"
            }
            aria-hidden="true"
          >
            s<span>.</span>
          </span>
          <span
            className={
              "brand-name [font-size:13px] [font-weight:750] leading-[1.5] [&_>_span]:block [&_>_span]:[font-size:10px] [&_>_span]:font-medium [&_>_span]:text-muted-foreground max-[800.01px]:[font-size:12px] max-[480.01px]:[&_>_span]:[font-size:9px] max-[380.01px]:hidden"
            }
          >
            {name}
            <span>Frontend developer</span>
          </span>
        </Link>
        <PillNav
          items={links}
          linkComponent={SectionLink}
          className={String.raw`desktop-nav flex gap-7.5 ml-auto mr-9 [&_a]:[font-size:13px] [&_a]:font-semibold [&_a]:py-3.5 [&_a]:[transition:color_0.2s] [&_a:hover]:text-primary [&.portfolio-pill-nav]:gap-0 [&.portfolio-pill-nav]:mr-[0] [&.portfolio-pill-nav_a]:p-[0_14px] [&.portfolio-pill-nav_a]:[font-size:12px] [&.portfolio-pill-nav_a]:font-semibold [&.portfolio-pill-nav_a:hover]:text-foreground max-[800.01px]:[&.portfolio-pill-nav]:hidden max-[1100.01px]:mr-2.5 max-[1100.01px]:gap-5 max-[800.01px]:hidden portfolio-pill-nav [&_.pill-nav\_\_bar]:[box-shadow:none] [&_.pill-nav\_\_bar]:[--pn-edge:var(--border)] [&_.pill-nav\_\_bar]:[--pn-rim:color-mix(in_srgb,_var(--foreground)_6%,_transparent)] [&_.pill-nav\_\_bar]:[--pn-ring:var(--primary)]`}
          ariaLabel={locale === "ru" ? "Основная навигация" : "Main navigation"}
          // Keep the SSR palette deterministic; live colors come from CSS tokens.
          theme="light"
          collapse="never"
          intro={false}
          size="sm"
          itemStyle="plain"
          surface="solid"
          hoverEffect="fill"
          indicator="none"
          activeHref=""
          barColor="var(--muted)"
          textColor="var(--foreground)"
          highlightColor="var(--primary)"
          highlightTextColor="var(--primary-foreground)"
        />
        <div
          className={
            "header-controls [&_.header-github]:rounded-[999px] [&_.header-github]:[background:var(--primary)] [&_.header-github]:text-primary-foreground [&_.header-github]:[border-color:transparent] [&_.header-github]:[transition:box-shadow_200ms,_transform_200ms] [&_.header-github:hover]:[background:var(--primary)] [&_.header-github:hover]:text-primary-foreground [&_.header-github:hover]:[box-shadow:0_0_0_4px_color-mix(in_srgb,_var(--primary)_15%,_transparent)] [&_.header-github:hover]:[transform:translateY(-1px)] flex items-center gap-3 max-[800.01px]:gap-[7px] max-[480.01px]:gap-0.5 print:hidden!"
          }
        >
          <div
            className={
              "header-tools flex items-center gap-[3px] p-[3px] [border:1px_solid_var(--border)] rounded-[999px] [background:var(--muted)] [&_.language-button]:w-9 [&_.language-button]:h-9 [&_.language-button]:p-0 [&_.language-button]:justify-center [&_.language-button]:rounded-[999px] [&_.theme-button]:rounded-[50%] [&_.motion-button]:rounded-[50%] [&_:is(.language-button,_.theme-button,_.motion-button)]:relative [&_:is(.language-button,_.theme-button,_.motion-button)]:isolate [&_:is(.language-button,_.theme-button,_.motion-button)]:overflow-hidden [&_:is(.language-button,_.theme-button,_.motion-button)]:[background:transparent] [&_:is(.language-button,_.theme-button,_.motion-button)]:[transition:color_250ms_ease] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:[content:''] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:absolute [&_:is(.language-button,_.theme-button,_.motion-button)::before]:z-[-1] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:top-[100%] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:left-[50%] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:w-[200%] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:h-[200%] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:m-[-100%_0_0_-100%] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:rounded-[50%] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:[background:var(--primary)] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:[transform:scale(0)] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:[transition:transform_360ms_cubic-bezier(0.4,_0,_0.2,_1)] [&_:is(.language-button,_.theme-button,_.motion-button)::before]:pointer-events-none [&_:is(.language-button,_.theme-button,_.motion-button):is(_:hover,_:focus-visible_)]:[background:transparent] [&_:is(.language-button,_.theme-button,_.motion-button):is(_:hover,_:focus-visible_)]:text-primary-foreground [&_:is(.language-button,_.theme-button,_.motion-button):is(_:hover,_:focus-visible_)::before]:[transform:scale(1)] [&_:is(.language-button,_.theme-button,_.motion-button):is(_:hover,_:focus-visible_)::before]:[transition:transform_550ms_cubic-bezier(0.22,_1,_0.36,_1)] [&_.control-divider]:mx-0.5 max-[800.01px]:gap-0 max-[800.01px]:p-0.5 max-[800.01px]:[&_.language-button]:px-1.5"
            }
          >
            <Link
              href={alternateHref}
              className={
                "language-button flex items-center gap-[5px] [font-size:11px] font-bold min-h-9 p-1.5"
              }
              hrefLang={locale === "ru" ? "en" : "ru"}
              aria-label={labels.language}
              title={labels.language}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                transitionLanguage(
                  () => router.push(alternateHref, { scroll: false }),
                  motion.enabled,
                );
              }}
            >
              {locale === "ru" ? "EN" : "RU"}
            </Link>
            <span
              className={
                "control-divider h-[17px] w-[1px] [background:var(--border)] max-[480.01px]:mx-[3px]"
              }
              aria-hidden="true"
            />
            <Button
              variant="ghost"
              size="icon"
              className={"theme-button w-9 h-9"}
              onClick={(event) => {
                const next = resolvedTheme === "dark" ? "light" : "dark";
                transitionTheme(
                  event.currentTarget,
                  () => {
                    flushSync(() => setTheme(next));
                    document.documentElement.classList.toggle(
                      "dark",
                      next === "dark",
                    );
                    document.documentElement.classList.toggle(
                      "light",
                      next === "light",
                    );
                    document.documentElement.style.colorScheme = next;
                  },
                  motion.enabled,
                );
              }}
              aria-label={labels.theme}
              title={labels.theme}
            >
              <Moon className={"theme-moon dark:hidden"} aria-hidden="true" />
              <Sun
                className={"theme-sun hidden dark:block"}
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={"motion-button w-9 h-9"}
              onClick={motion.toggle}
              aria-pressed={motion.enabled}
              aria-label={
                motion.enabled ? labels.motionDisable : labels.motionEnable
              }
              title={
                motion.enabled ? labels.motionDisable : labels.motionEnable
              }
            >
              {motion.enabled ? (
                <Pause aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
            </Button>
          </div>
          <a
            className={
              "header-github flex items-center gap-3.5 [border:1px_solid_var(--border)] rounded-[6px] p-[10px_15px] ml-[5px] [font-size:12px] [font-weight:650] max-[800.01px]:hidden"
            }
            href={github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <Sheet
            open={open}
            onOpenChange={setOpen}
            onOpenChangeComplete={(isOpen) => {
              if (isOpen || !pendingNavigation.current) return;
              const href = pendingNavigation.current;
              pendingNavigation.current = null;
              // Let the dialog release its scroll lock and restore focus first.
              requestAnimationFrame(() => {
                if (isHome) location.assign(href);
                else router.push(href);
              });
            }}
          >
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={"mobile-menu hidden max-[800.01px]:inline-flex"}
                  aria-label={labels.menu}
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              showCloseButton={false}
              className={"mobile-sheet p-[35px]"}
            >
              <SheetTitle className="text-xl">{name}</SheetTitle>
              <SheetDescription>Frontend / React & TypeScript</SheetDescription>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className={"sheet-close absolute top-[25px] right-[20px]"}
                    aria-label={labels.close}
                  />
                }
              >
                <X aria-hidden="true" />
              </SheetClose>
              <nav
                aria-label={labels.menu}
                className={
                  "sheet-nav flex flex-col mt-12 [&_a]:flex [&_a]:items-center [&_a]:gap-3.5 [&_a]:py-[25px] [&_a]:[border-bottom:1px_solid_var(--border)] [&_a]:[font-size:24px] [&_a_>_span]:[font:10px_ui-monospace,_monospace] [&_a_>_span]:text-muted-foreground [&_a_>_svg]:ml-auto [&_a_>_svg]:w-5"
                }
              >
                {links.map((link, index) => (
                  <SectionLink
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      if (
                        event.button !== 0 ||
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      )
                        return;
                      event.preventDefault();
                      pendingNavigation.current = link.href;
                      setOpen(false);
                    }}
                  >
                    <span>0{index + 1}</span>
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </SectionLink>
                ))}
              </nav>
              <a
                className={"sheet-github mt-auto flex items-center gap-[15px]"}
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <noscript>
        <nav className={"noscript-nav flex flex-wrap p-4 gap-5 justify-center"}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
