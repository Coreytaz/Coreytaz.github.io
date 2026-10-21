"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useTheme } from "next-themes";
import type { GlowCursorProps } from "@/components/react-bits/GlowCursor";
import { useMotion } from "@/components/motion-provider";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const { enabled } = useMotion();
  const { resolvedTheme } = useTheme();
  const [Glow, setGlow] = useState<ComponentType<GlowCursorProps> | null>(null);
  const [canGlow, setCanGlow] = useState(false);
  useEffect(() => {
    const media = matchMedia(
      "(pointer: fine) and (hover: hover) and (forced-colors: none)",
    );
    const update = () => setCanGlow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!enabled || !canGlow || Glow) return;
    let cancelled = false;
    void import("@/components/react-bits/GlowCursor")
      .then((module) => {
        if (!cancelled) setGlow(() => module.default);
      })
      .catch(() => {
        /* The arrow works without the optional WebGL effect. */
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, canGlow, Glow]);

  useEffect(() => {
    const root = rootRef.current;
    const arrow = arrowRef.current;
    if (!root || !arrow) return;
    if (!enabled) return;
    const html = document.documentElement;
    const fine = matchMedia("(any-pointer: fine) and (any-hover: hover)");
    const contrast = matchMedia("(forced-colors: active)");
    let visible = false;
    let x = 0,
      y = 0;
    let raf = 0;

    const hide = () => {
      visible = false;
      cancelAnimationFrame(raf);
      raf = 0;
      delete html.dataset.customCursor;
      delete html.dataset.nativeCursor;
      html.style.removeProperty("--native-cursor");
      delete root.dataset.pressed;
    };
    const paint = () => {
      raf = 0;
      if (visible) arrow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const inspectTarget = (target: Element | null) => {
      // Read the site's cursor before our visual replacement overrides it.
      const active = html.dataset.customCursor;
      delete html.dataset.customCursor;
      delete html.dataset.nativeCursor;
      const nativeCursor = target ? getComputedStyle(target).cursor : "auto";
      if (active) html.dataset.customCursor = active;
      if (
        target?.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], iframe',
        )
      ) {
        hide();
        return false;
      }
      const targetControl =
        target?.closest(
          'a[href], button, summary, [role="button"], [role="link"], label[for]',
        ) ?? null;
      const disabled = target?.closest(
        'button:disabled, [aria-disabled="true"]',
      );
      const kind = disabled
        ? "disabled"
        : nativeCursor === "pointer" ||
            (nativeCursor === "auto" && targetControl)
          ? "interactive"
          : "default";
      if (root.dataset.kind !== kind) root.dataset.kind = kind;
      const mode = disabled ? "not-allowed" : nativeCursor;
      root.dataset.cursor = mode;
      // Preserve every CSS cursor keyword, custom URL and text editing affordance.
      // Only default/auto/pointer are replaced by the site's branded artwork.
      if (!["auto", "default", "pointer"].includes(mode)) {
        html.dataset.nativeCursor = "on";
        html.style.setProperty("--native-cursor", mode);
      }
      return true;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches || contrast.matches) {
        hide();
        return;
      }
      if (!inspectTarget(event.target instanceof Element ? event.target : null))
        return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        arrow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        visible = true;
        html.dataset.customCursor = "on";
      }
      wake();
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const press = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") hide();
      else if (visible) root.dataset.pressed = "true";
    };
    const release = () => {
      delete root.dataset.pressed;
      if (visible) inspectTarget(document.elementFromPoint(x, y));
    };
    const scroll = () => {
      if (visible && inspectTarget(document.elementFromPoint(x, y))) wake();
    };
    const visibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", hide);
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    window.addEventListener("resize", scroll);
    document.addEventListener("pointerout", leave);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", hide);
    contrast.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", scroll);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", hide);
      contrast.removeEventListener("change", hide);
    };
  }, [enabled]);

  return (
    <div
      className={
        "custom-cursor hidden fixed inset-0 z-[9999] pointer-events-none [html[data-custom-cursor='on']_&]:block [&[data-kind='interactive']_.cursor-default-shape]:hidden [&[data-kind='interactive']_.cursor-pointer-shape]:block! [&[data-kind='interactive']_.cursor-pointer-shape]:[translate:-9px_-2px] [&[data-kind='interactive']_.cursor-pointer-shape]:[transform-origin:9px_2px] [&[data-kind='interactive']_.cursor-arrow_svg]:[transform:scale(1.12)] [&[data-kind='interactive']_.cursor-arrow_svg]:[filter:drop-shadow(_0_0_5px_color-mix(in_srgb,_var(--primary)_50%,_transparent)_)] [&[data-kind='disabled']_.cursor-arrow]:opacity-[0.5] [&[data-pressed='true']_.cursor-arrow_svg]:[transform:scale(0.85)] [@media_(forced-colors:_active)]:[html[data-custom-cursor='on']_&]:hidden print:[html[data-custom-cursor='on']_&]:hidden"
      }
      ref={rootRef}
      aria-hidden="true"
    >
      {enabled && canGlow && Glow && (
        <Glow
          className={String.raw`portfolio-glow absolute inset-0 w-full h-full overflow-hidden pointer-events-none [&[data-render-state='fallback']_>_.glow-cursor\_\_canvas]:hidden [&[data-render-state='fallback']_>_.glow-cursor\_\_fallback]:block`}
          color={resolvedTheme === "dark" ? "#91abff" : "#4166db"}
          secondaryColor="#8074db"
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          quality="low"
          maxDevicePixelRatio={1}
          intensity={0.65}
          trailWidth={2}
          linger={0.55}
          glow={0.45}
          hotspot={0.3}
          followSpeed={0.85}
          respectReducedMotion={false}
          clickBurst={false}
          aria-hidden="true"
        />
      )}
      <span
        className={
          "cursor-arrow absolute top-0 left-0 [will-change:transform] text-primary [html[data-native-cursor='on']_&]:[visibility:hidden] [&_svg]:block [&_svg]:[translate:-2px_-2px] [&_svg]:[transform-origin:2px_2px] [&_svg]:[filter:drop-shadow(0_1px_2px_#0005)] [&_svg]:[transition:transform_160ms_ease,_filter_160ms_ease]"
        }
        ref={arrowRef}
      >
        <svg
          className="cursor-default-shape"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M2 2L21 6.5L13 11L10.5 20L2 2Z"
            fill="currentColor"
            stroke="var(--background)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className={"cursor-pointer-shape hidden!"}
          width="26"
          height="28"
          viewBox="0 0 26 28"
          fill="none"
        >
          <path
            d="M9 13V4a2 2 0 0 1 4 0v7-2a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v2a2 2 0 0 1 3 2v4c0 4-3 7-7 7h-3c-2 0-4-1-5-3l-6-7a2 2 0 0 1 3-3l3 3Z"
            fill="currentColor"
            stroke="var(--background)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
