import { Clock, Eye, MousePointerClick, Users } from "lucide-react";
import { useSelector } from "react-redux";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import { BounceLineChart, SourcesDonut, TrafficAreaChart } from "../components/charts";
import { RANGES, TRAFFIC_SOURCES, selectChartData, selectStats } from "../features/filterSlice";

export default function Analytics() {
  const stats = useSelector(selectStats);
  const data = useSelector(selectChartData);
  const range = useSelector((s) => s.filters.range);
  const rangeLabel = RANGES.find((r) => r.value === range).label.toLowerCase();

  const cards = [
    { label: "Unique Visitors", value: stats.visitors, icon: Users, change: stats.trend[0] },
    { label: "Pageviews", value: stats.pageviews, icon: Eye, change: stats.trend[1] },
    { label: "Bounce Rate", value: stats.bounce, icon: MousePointerClick, change: stats.trend[2], goodWhenDown: true },
    { label: "Visit Duration", value: stats.duration, icon: Clock, change: stats.trend[3] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Store traffic for the last {rangeLabel}.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => <StatCard key={c.label} {...c} />)}
      </div>

      <ChartCard title="Traffic overview" subtitle="Unique visitors and pageviews over time">
        <TrafficAreaChart data={data} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <ChartCard className="lg:col-span-3" title="Bounce rate" subtitle="Share of visits that left after one page">
          <BounceLineChart data={data} />
        </ChartCard>
        <ChartCard className="lg:col-span-2" title="Traffic sources" subtitle="Where your visitors come from">
          <SourcesDonut data={TRAFFIC_SOURCES} />
        </ChartCard>
      </div>
    </div>
  );
}