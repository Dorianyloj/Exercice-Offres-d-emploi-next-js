import { JobCard } from "@/components/JobCard";
import type { JobOfferDocument } from "@/types/prismic";

type JobsGridProps = {
  className?: string;
  emptyMessage: string;
  jobs: JobOfferDocument[];
};

export function JobsGrid({
  className = "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
  emptyMessage,
  jobs,
}: JobsGridProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
