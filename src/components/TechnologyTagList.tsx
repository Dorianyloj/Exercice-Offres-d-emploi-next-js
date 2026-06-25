import Link from "next/link";

import { getTagHref } from "@/lib/tags";

export function TechnologyTagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return (
      <p className="mt-4 text-sm text-slate-500">
        Aucun tag technologie pour le moment.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={getTagHref(tag)}
          className="border-2 border-[var(--primary)] bg-[var(--medium)] px-3 py-2 text-base font-medium text-[var(--primary)] transition hover:bg-white"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
