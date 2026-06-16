export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? (typeof window !== 'undefined' ? window.location.origin : '');

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  expiresIn?: number;
  user?: { id: string; email: string; role?: string };
}

async function fetchJSON(path: string, opts: RequestInit = {}) {
  // Inject Authorization header from localStorage when available (browser only)
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        opts.headers = {
          ...(opts.headers || {}),
          Authorization: `Bearer ${token}`,
        } as Record<string, string>;
      }
    }
  } catch (e) {
    // ignore localStorage errors
  }

  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const fetchAnalytics = async () => {
  return fetchJSON('/api/analytics');
};

export const postAdminLogin = async (payload: AdminLoginPayload): Promise<AdminLoginResponse> => {
  return fetchJSON('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export function setToken(token: string, expiresInSeconds?: number) {
  try {
    localStorage.setItem('token', token);
    if (expiresInSeconds) {
      const exp = Date.now() + expiresInSeconds * 1000;
      localStorage.setItem('token_exp', String(exp));
    } else {
      localStorage.removeItem('token_exp');
    }
  } catch (e) {}
}

export function getToken(): string | null {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    return null;
  }
}

export function clearToken() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('token_exp');
  } catch (e) {}
}

function parseJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function isTokenExpired(token?: string) {
  const t = token ?? getToken();
  if (!t) return true;
  try {
    const stored = localStorage.getItem('token_exp');
    if (stored) {
      const exp = parseInt(stored, 10);
      return Date.now() > exp;
    }
  } catch (e) {}

  const parsed = parseJwt(t);
  if (parsed && parsed.exp) {
    // exp is in seconds
    return Date.now() > parsed.exp * 1000;
  }
  return false;
}

export const postEncrypt = async (payload: unknown) => {
  return fetchJSON('/api/encrypt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
};

export const postDecrypt = async (payload: unknown) => {
  return fetchJSON('/api/decrypt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
};

export const postBruteForce = async (payload: unknown) => {
  return fetchJSON('/api/cryptanalysis/bruteforce', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
};

export const postFrequency = async (payload: unknown) => {
  return fetchJSON('/api/cryptanalysis/frequency', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
};

export const postChiSquare = async (payload: unknown) => {
  return fetchJSON('/api/cryptanalysis/chisquare', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
};
