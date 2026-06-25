import { MaterialSymbol } from "@/components/MaterialSymbol";

export function JobCountBadge({ count }: { count: number }) {
  const label = `${count} ${count > 1 ? "offres" : "offre"}`;

  return (
    <div className="inline-flex items-center gap-3 px-4 py-3 text-[var(--dark)]">
        <MaterialSymbol name="business_center" className="text-[var(--primary)]" />
      <span className="text-lg text-[var(--primary)] font-semibold">{label}</span>
    </div>
  );
}
