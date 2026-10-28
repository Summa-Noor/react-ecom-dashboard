import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CATEGORIES, addProduct } from "../features/productSlice";
import { showToast } from "../features/uiSlice";
import CategorySelect from "../components/CategorySelect";

const empty = { title: "", price: "", category: "" };

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [categoryError, setCategoryError] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.category) return setCategoryError(true);
    dispatch(addProduct({ title: form.title.trim(), price: form.price, category: form.category }));
    dispatch(showToast({ type: "success", message: "Product added." }));
    setForm(empty);
    navigate("/products");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Add product</h1>

      <form onSubmit={onSubmit} className="card space-y-4">
        <label className="block text-sm">
          Product name
          <input className="input mt-1" name="title" placeholder="e.g. Wireless Headphones" value={form.title} onChange={onChange} required />
        </label>

        <label className="block text-sm">
          Price (USD)
          <input className="input mt-1" type="number" min="0" step="0.01" name="price" placeholder="0.00" value={form.price} onChange={onChange} required />
        </label>

        <div className="text-sm">
          <span>Category</span>
          <CategorySelect
            value={form.category}
            options={CATEGORIES}
            invalid={categoryError}
            onChange={(category) => { setForm({ ...form, category }); setCategoryError(false); }}
          />
          {categoryError && <p role="alert" className="mt-1 text-xs text-red-500">Please select a category.</p>}
        </div>

        <div className="flex gap-3">
          <button className="btn" type="submit">Save product</button>
          <button className="btn-ghost" type="button" onClick={() => navigate("/products")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}