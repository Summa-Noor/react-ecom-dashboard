import { TrendingDown, TrendingUp } from "lucide-react";

export default function StatCard({ label, value, change, icon: Icon, goodWhenDown = false }) {
  const up = change >= 0;
  const good = goodWhenDown ? !up : up;
  const Trend = up ? TrendingUp : TrendingDown;
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500"><Icon size={22} /></span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${good ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"}`}>
          <Trend size={14} />{Math.abs(change)}%
        </span>
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}