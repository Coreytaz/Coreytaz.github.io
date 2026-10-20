"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
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
  const { resolvedTheme, setTheme } = useTheme();
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
        <nav
          aria-label={
            locale === "ru" ? "Основная навигация" : "Main navigation"
          }
          className="desktop-nav"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <Link
            href={alternateHref}
            className="language-button"
            hrefLang={locale === "ru" ? "en" : "ru"}
            aria-label={labels.language}
          >
            {locale === "ru" ? "EN" : "RU"}
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
          <span className="control-divider" aria-hidden="true" />
          <Button
            variant="ghost"
            size="icon"
            className="theme-button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label={labels.theme}
            title={labels.theme}
          >
            <Moon className="theme-moon" aria-hidden="true" />
            <Sun className="theme-sun" aria-hidden="true" />
          </Button>
          <a
            className="header-github"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
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
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>0{index + 1}</span>
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
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
