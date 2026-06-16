"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Toast = { id: number; type: "info" | "success" | "error"; message: string };

type ToastContextType = { showToast: (message: string, type?: Toast["type"]) => void };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), type, message }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => {
        setToasts((prev) => prev.filter((p) => p.id !== t.id));
      }, 4000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed z-[9999] flex flex-col gap-3 top-4 left-1/2 transform -translate-x-1/2 md:top-auto md:left-auto md:bottom-6 md:right-6 md:transform-none w-[min(95%,420px)] md:w-auto">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`w-full md:w-auto px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-white animate-fade-in-up ${
              t.type === "info" ? "bg-sky-600" : t.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
