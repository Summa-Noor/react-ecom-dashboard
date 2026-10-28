export default function ErrorBanner({ message, onRetry, onClose }) {
  return (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
      <span>{message}</span>
      <span className="flex gap-2">
        {onRetry && <button onClick={onRetry} className="rounded-md bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-700">Retry</button>}
        {onClose && <button onClick={onClose} className="rounded-md px-3 py-1 font-medium hover:bg-red-100 dark:hover:bg-red-900/50">Dismiss</button>}
      </span>
    </div>
  );
}
