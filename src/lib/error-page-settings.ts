import type { Locale, Portfolio } from "@/lib/content-schema";

export const errorCopyKeys = [
  "skip",
  "navWork",
  "navAbout",
  "navContact",
  "navMenu",
  "navClose",
  "theme",
  "language",
  "home",
  "motionEnable",
  "motionDisable",
  "notFoundTitle",
  "notFoundText",
  "serverErrorTitle",
  "serverErrorText",
  "retry",
] as const;

export type ErrorPageSettings = {
  locale: Locale;
  name: string;
  github: string;
  copy: Pick<Portfolio["copy"]["ru"], (typeof errorCopyKeys)[number]>;
};
