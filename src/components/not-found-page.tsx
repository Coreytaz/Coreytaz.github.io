import { ErrorPage } from "@/components/error-page";

export function NotFoundPage() {
  return <ErrorPage status={404} />;
}
