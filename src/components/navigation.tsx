"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X, Play, Pause } from "lucide-react";
import PillNav from "@/components/react-bits/PillNav";
import "@/components/react-bits/PillNav.css";
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
    { href: `${homeHref}#about`, label: labels.about },
    { href: `${homeHref}#contact`, label: labels.contact },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href={homeHref}
          className="brand"
          aria-label={`${name} — ${labels.home}`}
        >
          <span className="brand-symbol" aria-hidden="true">
            s<span>.</span>
          </span>
          <span className="brand-name">
            {name}
            <span>Frontend developer</span>
          </span>
        </Link>
        <PillNav
          items={links}
          linkComponent={SectionLink}
          className="desktop-nav portfolio-pill-nav"
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
        <div className="header-controls">
          <div className="header-tools">
            <Link
              href={alternateHref}
              className="language-button"
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
            <span className="control-divider" aria-hidden="true" />
            <Button
              variant="ghost"
              size="icon"
              className="theme-button"
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
              <Moon className="theme-moon" aria-hidden="true" />
              <Sun className="theme-sun" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="motion-button"
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
            className="header-github"
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
                  className="mobile-menu"
                  aria-label={labels.menu}
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent showCloseButton={false} className="mobile-sheet">
              <SheetTitle className="text-xl">{name}</SheetTitle>
              <SheetDescription>Frontend / React & TypeScript</SheetDescription>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="sheet-close"
                    aria-label={labels.close}
                  />
                }
              >
                <X aria-hidden="true" />
              </SheetClose>
              <nav aria-label={labels.menu} className="sheet-nav">
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
                className="sheet-github"
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
        <nav className="noscript-nav">
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
