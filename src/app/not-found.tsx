import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Page introuvable
        </h1>
        <p className="mt-4 text-slate-600">
          La page demandée n'existe pas ou n'est plus disponible.
        </p>
        <Link
          href="/offres"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Voir les offres
        </Link>
      </div>
    </main>
  );
}
