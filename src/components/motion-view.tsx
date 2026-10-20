"use client";

import { ViewTransition, type ReactNode } from "react";
import { useMotion } from "@/components/motion-provider";

export function MotionView({
  children,
  name,
  kind = "page",
}: {
  children: ReactNode;
  name: string;
  kind?: "page" | "project-image" | "project-title";
}) {
  const { enabled } = useMotion();
  const pageTransition = (defaultClass: string) =>
    enabled && kind === "page"
      ? { default: defaultClass, "project-return": "page-return" }
      : "none";
  return (
    <ViewTransition
      name={name}
      default="none"
      enter={pageTransition("page-enter")}
      exit={pageTransition("page-exit")}
      update={pageTransition("page-update")}
      share={
        enabled
          ? {
              default: kind === "page" ? "page-update" : kind,
              language: kind === "page" ? "page-update" : "none",
              "project-return": kind === "page" ? "page-return" : "none",
            }
          : "none"
      }
    >
      {children}
    </ViewTransition>
  );
}
