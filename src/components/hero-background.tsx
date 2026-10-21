"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useTheme } from "next-themes";
import { useMotion } from "@/components/motion-provider";
import type { WavesProps } from "@/components/react-bits/Waves";

export function HeroBackground() {
  const { enabled } = useMotion();
  const { resolvedTheme } = useTheme();
  const [Waves, setWaves] = useState<ComponentType<WavesProps> | null>(null);

  useEffect(() => {
    if (!enabled || Waves) return;
    let cancelled = false;
    // An ordinary update keeps this decorative load out of page View Transitions.
    // A Suspense reveal inside MotionView would animate the whole first screen.
    void import("@/components/react-bits/Waves")
      .then((module) => {
        if (!cancelled) setWaves(() => module.default);
      })
      .catch(() => {
        /* The CSS gradient remains available if the optional chunk cannot load. */
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, Waves]);

  return (
    <div
      className={String.raw`hero-background absolute inset-0 pointer-events-none [background:radial-gradient(_ellipse_at_80%_40%,_color-mix(in_srgb,_var(--primary)_8%,_transparent),_transparent_65%_)] [mask-image:linear-gradient(#000_0%,_#000_65%,_transparent_100%)] [&_>_.waves]:[mask-image:linear-gradient(90deg,_#0001,_#0007_40%,_#000_75%)] [&_.waves\_\_canvas]:opacity-[0] [&_.waves[data-render-state='ready']_.waves\_\_canvas]:opacity-[1] before:[content:''] before:absolute before:inset-0 before:opacity-[0.35] before:[background:repeating-radial-gradient(_ellipse_at_110%_100%,_transparent_0_28px,_color-mix(in_srgb,_var(--primary)_10%,_transparent)_29px,_transparent_30px_45px_)] before:[mask-image:linear-gradient(90deg,_transparent_20%,_#000)] [&:has(.waves[data-render-state='ready'])::before]:hidden [html[data-motion='off']_&_>_.waves]:hidden print:hidden`}
      aria-hidden="true"
    >
      {enabled && Waves && (
        <Waves
          lineColor={resolvedTheme === "dark" ? "#91abff" : "#4166db"}
          accentColor="#8074db"
          spacing={18}
          lineWidth={0.8}
          rotation={-25}
          amplitude={38}
          scale={1.3}
          twist={0.6}
          speed={0.3}
          opacity={0.32}
          dpr={0.75}
          intro={false}
          mouseInteraction={false}
          clickRipple={false}
          fade={0.25}
        />
      )}
    </div>
  );
}
