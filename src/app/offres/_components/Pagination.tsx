import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getPageHref(page: number) {
  return page === 1 ? "/offres" : `/offres?page=${page}`;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination des offres"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          className="inline-flex h-10 items-center justify-center border-2 border-[var(--primary)] px-4 text-sm font-medium text-[var(--primary)] transition hover:bg-white"
        >
          Précédent
        </Link>
      ) : null}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Link
            key={page}
            href={getPageHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={
              page === currentPage
                ? "inline-flex h-10 min-w-10 items-center justify-center bg-[var(--primary)] px-3 text-sm font-medium text-white"
                : "inline-flex h-10 min-w-10 items-center justify-center border-2 border-[var(--primary)] px-3 text-sm font-medium text-[var(--primary)] transition hover:bg-white"
            }
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          href={getPageHref(currentPage + 1)}
          className="inline-flex h-10 items-center justify-center border-2 border-[var(--primary)] px-4 text-sm font-medium text-[var(--primary)] transition hover:bg-white"
        >
          Suivant
        </Link>
      ) : null}
    </nav>
  );
}
