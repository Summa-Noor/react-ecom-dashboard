import { Activity } from "lucide-react";

// compact = on very small screens show only the icon, text appears from `sm` up
export default function Logo({ size = "md", compact = false }) {
  const box = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex ${box} shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white`}>
        <Activity size={20} strokeWidth={2.4} />
      </span>
      <span className={`text-xl font-bold tracking-tight ${compact ? "hidden sm:inline" : ""}`}>
        Ecom<span className="text-brand-500">Pulse</span>
      </span>
    </div>
  );
}