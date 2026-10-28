import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ErrorBanner from "./ErrorBanner";
import { hideToast } from "../features/uiSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const toast = useSelector((s) => s.ui.toast);
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(hideToast()), 3500);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Content shifts right when the sidebar is open (768px and wider) */}
      <div className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ${sidebarOpen ? "md:pl-64" : "md:pl-0"}`}>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6"><Outlet /></main>
      </div>
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 w-80">
          {toast.type === "error"
            ? <ErrorBanner message={toast.message} onClose={() => dispatch(hideToast())} />
            : <div role="status" className="rounded-xl bg-emerald-600 px-4 py-3 text-sm text-white shadow-lg">{toast.message}</div>}
        </div>
      )}
    </div>
  );
}