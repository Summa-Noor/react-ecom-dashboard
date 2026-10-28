import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import filterReducer from "../features/filterSlice";
import uiReducer from "../features/uiSlice";

export const store = configureStore({
  reducer: { auth: authReducer, products: productReducer, filters: filterReducer, ui: uiReducer },
});
