import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes >
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Analytics />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
