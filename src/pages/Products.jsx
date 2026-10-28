import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import ProductsState from "../components/ProductsState";
import ProductsTable from "../components/ProductsTable";
import { fetchProducts } from "../features/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.products.status);

  // Products are fetched only when this page is opened
  useEffect(() => { if (status === "idle") dispatch(fetchProducts()); }, [status, dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link to="/products/add" className="btn gap-2"><Plus size={16} />Add product</Link>
      </div>
      <section className="card"><ProductsState><ProductsTable /></ProductsState></section>
    </div>
  );
}