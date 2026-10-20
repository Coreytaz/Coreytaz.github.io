import { ErrorPage } from "@/components/error-page";
import { errorMetadata } from "@/lib/seo";

export const metadata = errorMetadata("en", 500);
export default function ServerErrorPage() {
  return <ErrorPage status={500} />;
}
