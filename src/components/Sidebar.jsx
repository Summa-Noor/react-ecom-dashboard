import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, LayoutDashboard, Menu, ShoppingCart } from "lucide-react";
import { closeSidebar, toggleSidebar } from "../features/uiSlice";
import Logo from "./Logo";

const MENU = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, children: [{ to: "/", label: "Analytics" }] },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart, children: [{ to: "/products", label: "Products" }, { to: "/products/add", label: "Add Product" }] },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.sidebarOpen);
  const [expanded, setExpanded] = useState({ dashboard: true, ecommerce: true });
  const toggle = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));
  // After picking a page, auto-close only on small screens
  const onNavigate = () => { if (window.innerWidth < 1024) dispatch(closeSidebar()); };

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => dispatch(closeSidebar())} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto border-r border-slate-200 bg-white p-4 transition-transform duration-300 dark:border-slate-700 dark:bg-ink-800 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo + hamburger: clicking the hamburger hides the sidebar */}
        <div className="mb-8 flex items-center justify-between px-2">
          <Logo />
          <button onClick={() => dispatch(toggleSidebar())} aria-label="Hide sidebar"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
            <Menu size={22} />
          </button>
        </div>

        <p className="mb-2 px-3 text-xs font-medium text-slate-400">Menu</p>
        <nav className="space-y-1">
          {MENU.map(({ id, label, icon: Icon, children }) => (
            <div key={id}>
              <button onClick={() => toggle(id)} aria-expanded={expanded[id]} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                <span className="flex items-center gap-3"><Icon size={19} />{label}</span>
                <ChevronDown size={16} className={`transition-transform ${expanded[id] ? "rotate-180" : ""}`} />
              </button>
              {expanded[id] && (
                <ul className="ml-[22px] mt-1 space-y-1 border-l border-slate-200 pl-4 dark:border-slate-700">
                  {children.map((c) => (
                    <li key={c.to}>
                      <NavLink to={c.to} end onClick={onNavigate}
                        className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? "bg-brand-500/10 font-medium text-brand-500" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"}`}>
                        {c.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}