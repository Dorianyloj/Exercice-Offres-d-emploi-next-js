import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: ComponentProps<typeof Link>["href"];
};

export function ButtonLink({ children, className = "", href }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--dark)] hover:text-[var(--primary)] ${className}`}
    >
      {children}
    </Link>
  );
}
