export default function ChartCard({ title, subtitle, className = "", children }) {
  return (
    <section className={`card ${className}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      <div className="mt-4 h-64 w-full sm:h-72">{children}</div>
    </section>
  );
}