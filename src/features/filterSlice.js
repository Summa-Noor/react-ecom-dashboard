import { createSlice } from "@reduxjs/toolkit";

export const RANGES = [
  { value: "1M", label: "1 Month" },
  { value: "3M", label: "3 Months" },
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "1 Year" },
];

// KPI values per date range (1M = baseline numbers from the spec)
export const STATS_BY_RANGE = {
  "1M": { visitors: "24.7K", pageviews: "55.9K", bounce: "54%", duration: "2m 56s", trend: [4.3, 4.6, -1.2, 2.1] },
  "3M": { visitors: "71.2K", pageviews: "162.4K", bounce: "51%", duration: "3m 05s", trend: [6.1, 5.2, -2.4, 1.8] },
  "6M": { visitors: "138.9K", pageviews: "319.0K", bounce: "49%", duration: "3m 18s", trend: [8.7, 7.9, -3.1, 4.0] },
  "1Y": { visitors: "276.5K", pageviews: "644.3K", bounce: "47%", duration: "3m 41s", trend: [12.4, 11.0, -5.6, 6.3] },
};

// ---- Demo chart data (deterministic, so it doesn't change on every render) ----
const CONFIG = {
  "1M": { points: 30, visitors: 24700, pageviews: 55900, bounce: 54, unit: "day" },
  "3M": { points: 12, visitors: 71200, pageviews: 162400, bounce: 51, unit: "week" },
  "6M": { points: 6, visitors: 138900, pageviews: 319000, bounce: 49, unit: "month" },
  "1Y": { points: 12, visitors: 276500, pageviews: 644300, bounce: 47, unit: "month" },
};

const seeded = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Split `total` across n points with a gentle upward trend + noise
const spread = (total, n, rand) => {
  const w = Array.from({ length: n }, (_, i) => 1 + 0.3 * Math.sin((i / n) * Math.PI * 3) + 0.4 * (i / n) + 0.25 * rand());
  const sum = w.reduce((a, b) => a + b, 0);
  return w.map((x) => Math.round((x / sum) * total));
};

const label = (unit, i, n) => {
  if (unit === "day") return `Day ${i + 1}`;
  if (unit === "week") return `Wk ${i + 1}`;
  const d = new Date(); d.setMonth(d.getMonth() - (n - 1 - i));
  return d.toLocaleString("en", { month: "short" });
};

const build = (key, seed) => {
  const c = CONFIG[key];
  const rand = seeded(seed);
  const v = spread(c.visitors, c.points, rand);
  const p = spread(c.pageviews, c.points, rand);
  return v.map((visitors, i) => ({
    name: label(c.unit, i, c.points),
    visitors,
    pageviews: p[i],
    bounce: Math.round((c.bounce + (rand() - 0.5) * 8) * 10) / 10,
  }));
};

export const CHART_DATA = { "1M": build("1M", 11), "3M": build("3M", 22), "6M": build("6M", 33), "1Y": build("1Y", 44) };

export const TRAFFIC_SOURCES = [
  { name: "Organic", value: 42 },
  { name: "Direct", value: 28 },
  { name: "Referral", value: 18 },
  { name: "Social", value: 12 },
];

const filterSlice = createSlice({
  name: "filters",
  initialState: { range: "1M" },
  reducers: { setRange(state, { payload }) { state.range = payload; } },
});

export const { setRange } = filterSlice.actions;
export const selectStats = (state) => STATS_BY_RANGE[state.filters.range];
export const selectChartData = (state) => CHART_DATA[state.filters.range];
export default filterSlice.reducer;