import { Area, AreaChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "../context/ThemeContext";

export const COLORS = { brand: "#465fff", sky: "#7cc4fa", teal: "#12b886", amber: "#f5a524" };
const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

// Theme-aware axis/tooltip colours (Context API drives the chart palette too)
const useChartTheme = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    grid: dark ? "#334155" : "#e2e8f0",
    text: dark ? "#94a3b8" : "#64748b",
    tooltip: { backgroundColor: dark ? "#1c2434" : "#fff", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, borderRadius: 12, fontSize: 13, color: dark ? "#f1f5f9" : "#1e293b" },
  };
};

export function TrafficAreaChart({ data }) {
  const t = useChartTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <defs>
          {[["v", COLORS.brand], ["p", COLORS.sky]].map(([id, c]) => (
            <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={c} stopOpacity={0.3} /><stop offset="95%" stopColor={c} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke={t.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: t.text, fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={24} />
        <YAxis tick={{ fill: t.text, fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(n) => compact.format(n)} width={48} />
        <Tooltip contentStyle={t.tooltip} formatter={(n) => n.toLocaleString()} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
        <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke={COLORS.brand} strokeWidth={2.5} fill="url(#g-v)" />
        <Area type="monotone" dataKey="pageviews" name="Pageviews" stroke={COLORS.sky} strokeWidth={2.5} fill="url(#g-p)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BounceLineChart({ data }) {
  const t = useChartTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={t.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: t.text, fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={24} />
        <YAxis domain={[30, 70]} tick={{ fill: t.text, fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(n) => `${n}%`} width={44} />
        <Tooltip contentStyle={t.tooltip} formatter={(n) => `${n}%`} />
        <Line type="monotone" dataKey="bounce" name="Bounce Rate" stroke={COLORS.amber} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SourcesDonut({ data }) {
  const t = useChartTheme();
  const palette = [COLORS.brand, COLORS.sky, COLORS.teal, COLORS.amber];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={3} stroke="none">
          {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
        </Pie>
        <Tooltip contentStyle={t.tooltip} formatter={(n) => `${n}%`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}