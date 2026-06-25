import { MaterialSymbol } from "@/components/MaterialSymbol";

export function JobCountBadge({ count }: { count: number }) {
  const label = `${count} ${count > 1 ? "offres" : "offre"}`;

  return (
    <div className="inline-flex items-center gap-3 bg-white px-4 py-3 text-[var(--dark)]">
      <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--primary)] text-white">
        <MaterialSymbol name="business_center" className="text-[22px]" />
      </span>
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
}
