import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function CategorySelect({ value, onChange, options, placeholder = "Select a category", invalid = false }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const toggle = () => {
    setOpen((o) => !o);
    setActive(Math.max(options.indexOf(value), 0));
  };

  const choose = (opt) => { onChange(opt); setOpen(false); };

  const onKeyDown = (e) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); setActive(Math.max(options.indexOf(value), 0)); return; }
      setActive((i) => (e.key === "ArrowDown" ? (i + 1) % options.length : (i - 1 + options.length) % options.length));
    }
    if ((e.key === "Enter" || e.key === " ") && open && active >= 0) {
      e.preventDefault();
      choose(options[active]);
    }
  };

  return (
    <div ref={ref} className="relative mt-1" onKeyDown={onKeyDown}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-lg border bg-transparent px-4 py-2.5 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-brand-500/30
          ${open ? "border-brand-500 ring-2 ring-brand-500/20" : invalid ? "border-red-500" : "border-slate-300 dark:border-slate-600"}`}
      >
        <span className={value ? "text-slate-800 dark:text-slate-100" : "text-slate-400"}>{value || placeholder}</span>
        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul role="listbox" className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-ink-800">
          {options.map((opt, i) => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                onClick={() => choose(opt)}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition
                  ${i === active ? "bg-slate-100 dark:bg-slate-700" : ""}
                  ${selected ? "font-medium text-brand-500" : "text-slate-700 dark:text-slate-200"}`}
              >
                {opt}
                {selected && <Check size={16} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}