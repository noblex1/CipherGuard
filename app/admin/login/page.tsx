"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postAdminLogin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await postAdminLogin({ email, password });
      if (res?.token) {
        try { localStorage.setItem('token', res.token); } catch {}
        router.push('/admin');
      } else {
        setError('Invalid response from server');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <form onSubmit={submit} className="w-full max-w-md p-8 bg-white/60 dark:bg-black/60 rounded-lg backdrop-blur-md shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-sm text-destructive mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
            <input className="mt-1 w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input type="password" className="mt-1 w-full p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-primary text-white rounded" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
