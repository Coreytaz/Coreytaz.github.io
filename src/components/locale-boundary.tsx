import type { ReactNode } from "react";
import { ErrorPageProvider } from "@/components/error-page-provider";
import { portfolio } from "@/lib/content";
import {
  errorCopyKeys,
  type ErrorPageSettings,
} from "@/lib/error-page-settings";
import type { Locale } from "@/lib/content-schema";

export function LocaleBoundary({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <ErrorPageProvider
      value={{
        locale,
        name: portfolio.profile.name[locale],
        github: portfolio.profile.github,
        copy: Object.fromEntries(
          errorCopyKeys.map((key) => [key, portfolio.copy[locale][key]]),
        ) as ErrorPageSettings["copy"],
      }}
    >
      {children}
    </ErrorPageProvider>
  );
}
