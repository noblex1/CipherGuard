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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <form onSubmit={submit} className="w-full max-w-md p-8 glass-strong rounded-lg shadow-elegant">
        <h2 className="text-3xl font-bold mb-6 gradient-text">Admin Login</h2>
        {error && <div className="text-sm text-destructive bg-red-50 border border-red-200 rounded p-3 mb-4">{error}</div>}
        <label className="block mb-4">
          <span className="text-sm font-medium text-foreground mb-2 block">Email</span>
          <input 
            type="email"
            className="input-enhanced w-full p-3 rounded-md" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@cipherguard.com"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-sm font-medium text-foreground mb-2 block">Password</span>
          <input 
            type="password" 
            className="input-enhanced w-full p-3 rounded-md" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <button 
          type="submit"
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed shadow-md" 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
