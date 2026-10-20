"use client";

import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { useErrorPageSettings } from "@/components/error-page-provider";
import { useMotion } from "@/components/motion-provider";

export function ErrorPage({
  status,
  retry,
}: {
  status: 404 | 500;
  retry?: () => void;
}) {
  const { locale, name, github, copy } = useErrorPageSettings();
  const { enabled } = useMotion();
  const [FuzzyText, setFuzzyText] = useState<
    typeof import("@/components/react-bits/FuzzyText").default | null
  >(null);
  useEffect(() => {
    if (!enabled || FuzzyText) return;
    let cancelled = false;
    void import("@/components/react-bits/FuzzyText")
      .then((module) => {
        if (!cancelled) setFuzzyText(() => module.default);
      })
      .catch(() => {
        /* The HTML status code remains visible if the optional effect fails to load. */
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, FuzzyText]);
  const home = locale === "ru" ? "/" : "/en/";
  const alternate = locale === "ru" ? "/en/" : "/";

  return (
    <>
      {retry && (
        <>
          <title>{`500 — ${name}`}</title>
          <meta name="robots" content="noindex, nofollow" />
        </>
      )}
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <Navigation
        locale={locale}
        name={name}
        github={github}
        homeHref={home}
        alternateHref={`${alternate}${status === 404 ? "page-not-found/" : "500/"}`}
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
      <main className="error-page container" id="content" data-status={status}>
        <p className="eyebrow">
          {name} / HTTP {status}
        </p>
        <div className="error-code" aria-hidden="true">
          <span className="error-code-fallback">{status}</span>
          {enabled && FuzzyText && (
            <FuzzyText
              className="error-fuzzy"
              fontSize="clamp(112px, 23vw, 248px)"
              fontWeight={800}
              baseIntensity={0.12}
              hoverIntensity={0.36}
              fuzzRange={18}
              fps={30}
              transitionDuration={180}
            >
              {String(status)}
            </FuzzyText>
          )}
        </div>
        <h1>{status === 404 ? copy.notFoundTitle : copy.serverErrorTitle}</h1>
        <p className="error-description">
          {status === 404 ? copy.notFoundText : copy.serverErrorText}
        </p>
        <div className="error-actions">
          <a className="action-primary" href={home}>
            {copy.home}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          {status === 500 && (
            <button
              className="action-text"
              onClick={() => (retry ? retry() : location.reload())}
            >
              <RotateCcw size={16} aria-hidden="true" />
              {copy.retry}
            </button>
          )}
        </div>
        <a
          className="error-github action-text"
          href={github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </main>
    </>
  );
}
