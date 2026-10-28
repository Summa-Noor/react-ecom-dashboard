export default function DataTable({ columns, rows, emptyMessage = "Nothing to show yet." }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {columns.map((c) => <th key={c.key} className="px-3 py-3 font-medium">{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-3 py-10 text-center text-slate-500">{emptyMessage}</td></tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0 dark:border-slate-700/60">
                {columns.map((c) => <td key={c.key} className="px-3 py-3 align-middle">{c.render ? c.render(row) : row[c.key]}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
