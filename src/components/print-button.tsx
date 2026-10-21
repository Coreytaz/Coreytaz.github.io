"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ label }: { label: string }) {
  return (
    <Button
      variant="ghost"
      onClick={() => window.print()}
      className={
        "print-button [font-size:9px] text-muted-foreground print:hidden!"
      }
    >
      <Printer size={15} aria-hidden="true" />
      {label}
    </Button>
  );
}
