import type { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <div>
      <h1
        className={`inline-block border-b-8 border-[var(--primary)] pb-3 text-5xl font-medium leading-none text-[var(--dark)] ${className}`}
      >
        {children}
      </h1>
    </div>
  );
}
