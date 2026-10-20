"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMotion } from "@/components/motion-provider";

export function PageMotion() {
  const pathname = usePathname();
  const { enabled } = useMotion();

  useEffect(() => {
    if (!enabled || !window.IntersectionObserver || !Element.prototype.animate)
      return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          // Already visible content stays visible. Reveal the next sections as they enter.
          if (entry.boundingClientRect.top < 40) continue;
          element.dataset.revealed = "true";
          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 580,
              delay: Number(element.dataset.revealDelay ?? 0),
              easing: "cubic-bezier(.22, 1, .36, 1)",
              fill: "both",
            },
          );
          animations.add(animation);
          void animation.finished
            .then(() => {
              animation.cancel();
              animations.delete(animation);
            })
            .catch(() => {});
        }
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => {
        if (
          element.getBoundingClientRect().top > innerHeight * 0.7 &&
          element.dataset.revealed !== "true"
        )
          observer.observe(element);
      });
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname, enabled]);

  return null;
}
