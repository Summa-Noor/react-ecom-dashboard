import Logo from "../components/Logo";
export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card w-full max-w-md !p-8">
        <div className="mb-6"><Logo size="lg" /></div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
