import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, LogOut, Menu, Moon, Sun, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../features/authSlice";
import { RANGES, setRange } from "../features/filterSlice";
import { toggleSidebar } from "../features/uiSlice";
import UserAvatar from "./UserAvatar";
import Logo from "./Logo";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((s) => s.auth.user);
  const range = useSelector((s) => s.filters.range);
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleLogout = () => { dispatch(logout()); navigate("/login"); };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-3 py-3 backdrop-blur dark:border-slate-700 dark:bg-ink-800/90 sm:gap-3 sm:px-4">
      {/* Left: hamburger + logo appear only while the sidebar is hidden */}
      <div className="flex min-h-[40px] items-center gap-2">
        {!sidebarOpen && (
          <>
            <button onClick={() => dispatch(toggleSidebar())} aria-label="Show sidebar"
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
              <Menu size={22} />
            </button>
            <Link to="/" aria-label="EcomPulse home"><Logo compact /></Link>
          </>
        )}
      </div>

      {/* Right: filters, theme, profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative flex items-center">
          <CalendarDays size={16} className="pointer-events-none absolute left-3 text-slate-400" />
          <select value={range} onChange={(e) => dispatch(setRange(e.target.value))} aria-label="Date range"
            className="input !w-auto !py-2 !pl-9 dark:bg-ink-800">
            {RANGES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </label>

        <button onClick={toggleTheme} className="btn-ghost !px-3" aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div ref={ref} className="relative">
          <div className="group">
            <button onClick={() => setMenuOpen((o) => !o)} aria-haspopup="menu" aria-expanded={menuOpen} className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
              <UserAvatar name={user?.name} />
            </button>
            {/* Hover card shows the name entered at sign up */}
            {!menuOpen && (
              <div className="pointer-events-none absolute right-0 top-12 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                <p className="font-medium">{user?.name}</p>
                <p className="text-slate-300">{user?.email}</p>
              </div>
            )}
          </div>
          {menuOpen && (
            <ul role="menu" className="absolute right-0 top-12 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg dark:border-slate-700 dark:bg-ink-800">
              <li>
                <Link role="menuitem" to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <UserRound size={16} />Profile Page
                </Link>
              </li>
              <li>
                <button role="menuitem" onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <LogOut size={16} />Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}