import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "./LoaderSpinner";
import ErrorBanner from "./ErrorBanner";
import { fetchProducts } from "../features/productSlice";

// Wraps children with the async loading / error UI for the products fetch
export default function ProductsState({ children }) {
  const dispatch = useDispatch();
  const { status, error, items } = useSelector((s) => s.products);

  if (status === "loading" && items.length === 0) return <LoaderSpinner label="Fetching products…" />;
  return (
    <>
      {status === "failed" && (
        <div className="mb-4"><ErrorBanner message={`Couldn't load products: ${error}`} onRetry={() => dispatch(fetchProducts())} /></div>
      )}
      {children}
    </>
  );
}
