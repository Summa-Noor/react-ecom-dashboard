export default function LoaderSpinner({ label = "Loading…" }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-slate-500 dark:text-slate-400">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
