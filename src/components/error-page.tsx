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
      <main
        className={
          "error-page min-h-[calc(100svh_-_100px)] flex flex-col items-center justify-center gap-5 py-12 text-center [&_h1]:[font-size:clamp(28px,_4vw,_44px)] [&_h1]:font-semibold [&_h1]:tracking-[-0.04em] [&_h1]:leading-[1.2] max-[800.01px]:min-h-[calc(100svh_-_80px)] container w-[min(1240px,_calc(100%_-_112px))] mx-auto max-[1100.01px]:w-[calc(100%_-_72px)] max-[800.01px]:w-[calc(100%_-_48px)] max-[480.01px]:w-[calc(100%_-_40px)] print:w-full"
        }
        id="content"
        data-status={status}
      >
        <p
          className={
            "eyebrow [font-family:ui-monospace,_'Cascadia_Code',_monospace] [font-size:11px] font-medium tracking-[0.1em] leading-[1.6] uppercase text-muted-foreground"
          }
        >
          {name} / HTTP {status}
        </p>
        <div
          className={
            "error-code relative grid [place-items:center] w-full h-[clamp(172px,_30vw,_310px)] text-primary [font-size:clamp(112px,_23vw,_248px)] leading-[1] font-extrabold overflow-clip [@media_screen]:[html[data-motion='on']_&:has(canvas[data-ready='true'])_.error-code-fallback]:[visibility:hidden]"
          }
          aria-hidden="true"
        >
          <span className="error-code-fallback">{status}</span>
          {enabled && FuzzyText && (
            <FuzzyText
              className={
                "error-fuzzy absolute left-[50%] top-[50%] [transform:translate(-50%,_-50%)] [html[data-motion='off']_&]:hidden print:hidden"
              }
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
        <p
          className={
            "error-description text-muted-foreground max-w-[540px] leading-[1.8]"
          }
        >
          {status === 404 ? copy.notFoundText : copy.serverErrorText}
        </p>
        <div
          className={
            "error-actions flex flex-wrap justify-center items-center gap-[16px_28px] mt-3"
          }
        >
          <a
            className={
              "action-primary inline-flex items-center justify-center gap-6 p-[16px_22px] [background:var(--primary)] text-primary-foreground rounded-[7px] [font-size:12px] [font-weight:650] min-h-12.5 [transition:transform_0.2s,_filter_0.2s] hover:[transform:translateY(-2px)] hover:[filter:brightness(1.08)] [html[data-motion='off']_&:hover]:[transform:none] print:[background:transparent] print:[color:#2547b1] print:p-0 print:min-h-6"
            }
            href={home}
          >
            {copy.home}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          {status === 500 && (
            <button
              className={
                "action-text inline-flex items-center gap-[9px] min-h-11 [font-size:12px] [font-weight:650] hover:text-primary"
              }
              onClick={() => (retry ? retry() : location.reload())}
            >
              <RotateCcw size={16} aria-hidden="true" />
              {copy.retry}
            </button>
          )}
        </div>
        <a
          className={
            "error-github mt-3 text-muted-foreground action-text inline-flex items-center gap-[9px] min-h-11 [font-size:12px] [font-weight:650] hover:text-primary"
          }
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
