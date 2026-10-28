import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { deleteProduct } from "../features/productSlice";
import { showToast } from "../features/uiSlice";

// Reusable products table with optional client-side search
export default function ProductsTable({ searchable = true, limit }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.products.items);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? items.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : items;
    return limit ? filtered.slice(0, limit) : filtered;
  }, [items, query, limit]);

  const columns = [
    { key: "title", label: "Title", render: (p) => <span className="line-clamp-1 max-w-xs font-medium">{p.title}</span> },
    { key: "category", label: "Category", render: (p) => <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs capitalize dark:bg-slate-700">{p.category}</span> },
    { key: "price", label: "Price", render: (p) => `$${Number(p.price).toFixed(2)}` },
    { key: "actions", label: "", render: (p) => (
      <button onClick={() => { dispatch(deleteProduct(p.id)); dispatch(showToast({ type: "success", message: "Product deleted." })); }}
        className="rounded-md px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40">Delete</button>
    ) },
  ];

  return (
    <div>
      {searchable && <input className="input mb-4 max-w-sm" placeholder="Search by title or category…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search products" />}
      <DataTable columns={columns} rows={rows} emptyMessage={query ? "No products match your search." : "No products yet. Add one to get started."} />
    </div>
  );
}
