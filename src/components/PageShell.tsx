import type { ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { FooterDocument, HeaderDocument } from "@/types/prismic";

type PageShellProps = {
  children: ReactNode;
  footer: FooterDocument | null;
  header: HeaderDocument | null;
};

export function PageShell({ children, footer, header }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader header={header} />
      {children}
      <SiteFooter footer={footer} />
    </div>
  );
}
