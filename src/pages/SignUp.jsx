import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../features/authSlice";
import AuthShell from "./AuthShell";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    dispatch(signUp({ ...form, name: form.name.trim(), email: form.email.trim().toLowerCase() }));
    navigate("/login");
  };

  return (
    <AuthShell title="Create your account" subtitle="Sign up to open your dashboard.">
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="input" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button className="btn w-full" type="submit">Sign up</button>
      </form>
      <p className="mt-5 text-center text-sm">Already registered? <Link className="text-brand-500 hover:underline" to="/login">Log in</Link></p>
    </AuthShell>
  );
}
