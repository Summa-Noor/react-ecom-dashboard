import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Categories shown in the Add Product dropdown (max 3). Edit this list to change them.
export const CATEGORIES = ["Electronics", "Jewelery", "Clothing"];

export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.message || "Could not reach the products API.");
  }
});

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer(state, { payload }) { state.items.unshift(payload); },
      prepare({ title, price, category }) {
        return { payload: { id: `local-${Date.now()}`, title, price: Number(price), category, local: true } };
      },
    },
    deleteProduct(state, { payload: id }) {
      state.items = state.items.filter((p) => p.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const local = state.items.filter((p) => p.local); // keep manually-added items
        state.items = [...local, ...payload];
      })
      .addCase(fetchProducts.rejected, (state, { payload, error }) => {
        state.status = "failed";
        state.error = payload || error.message;
      });
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
