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
    <div className="hero-background" aria-hidden="true">
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
