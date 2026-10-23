import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { PageMotion } from "@/components/page-motion";
import { CustomCursor } from "@/components/custom-cursor";
import { ErrorPageProvider } from "@/components/error-page-provider";
import { portfolio } from "@/lib/content";
import {
  errorCopyKeys,
  type ErrorPageSettings,
} from "@/lib/error-page-settings";
import { motionInitScript } from "@/lib/motion-config";
import { DocumentLocale } from "@/components/document-locale";
import type { Locale } from "@/lib/content-schema";
import "@/app/globals.css";

export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={locale}
      data-motion="on"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script
          defer
          src="https://stats.coreytaz.ru/tracker.js"
          data-site-id="f3899769-8e7f-4b85-85d5-93b895482380"
        />
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.lang=/^\\/en(?:\\/|$)/.test(location.pathname)?'en':'ru'",
          }}
        />
        <ThemeProvider>
          <MotionProvider>
            <DocumentLocale />
            <CustomCursor />
            <ErrorPageProvider
              value={{
                locale,
                name: portfolio.profile.name[locale],
                github: portfolio.profile.github,
                copy: Object.fromEntries(
                  errorCopyKeys.map((key) => [
                    key,
                    portfolio.copy[locale][key],
                  ]),
                ) as ErrorPageSettings["copy"],
              }}
            >
              <PageMotion />
              {children}
            </ErrorPageProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
