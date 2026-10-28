import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../features/authSlice";
import ErrorBanner from "../components/ErrorBanner";
import AuthShell from "./AuthShell";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => { if (isAuthenticated) navigate("/", { replace: true }); }, [isAuthenticated, navigate]);
  useEffect(() => () => { dispatch(clearAuthError()); }, [dispatch]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: form.email.trim().toLowerCase(), password: form.password }));
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to see your analytics.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <ErrorBanner message={error} />}
        <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button className="btn w-full" type="submit">Log in</button>
      </form>
      <p className="mt-5 text-center text-sm">New here? <Link className="text-brand-500 hover:underline" to="/signup">Create an account</Link></p>
    </AuthShell>
  );
}
