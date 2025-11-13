import { useEffect } from "react";

const toneStyles = {
  success: "border-emerald-500 bg-emerald-500/10 text-emerald-600",
  error: "border-rose-500 bg-rose-500/10 text-rose-600",
  info: "border-blue-500 bg-blue-500/10 text-blue-600",
};

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;

    const handler = (event) => {
      if (event.key === "Escape") {
        onDismiss?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const { message, tone = "success" } = toast;
  const toneClassName = toneStyles[tone] ?? toneStyles.success;

  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex w-full max-w-md items-center justify-between rounded-md border px-4 py-3 shadow-lg backdrop-blur ${toneClassName}`}
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="ml-4 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Toast;


