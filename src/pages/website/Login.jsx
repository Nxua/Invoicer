import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Eye, EyeOff, LogIn, Wrench } from 'lucide-react';

const B = {
  navy:    '#0f2d5e',
  blue:    '#1e5cbf',
  lightBg: '#f0f5fc',
  border:  '#c8d9f0',
  text:    '#0c1f3d',
  muted:   '#4a6080',
};

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/portal';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(form.email, form.password);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    // Standalone page — white background
    <div className="min-h-screen flex flex-col" style={{ background: B.lightBg, color: B.text }}>

      {/* Top bar */}
      <div className="bg-white px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${B.border}`, boxShadow: '0 2px 8px rgba(15,45,94,0.06)' }}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})` }}>
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base" style={{ color: B.navy }}>CapePlumb</span>
        </Link>
        <Link to="/" className="text-sm font-medium transition-colors hover:underline" style={{ color: B.muted }}>
          ← Back to website
        </Link>
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})`, boxShadow: `0 6px 20px rgba(30,92,191,0.35)` }}>
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold" style={{ color: B.navy }}>Client Portal</h1>
            <p className="text-sm mt-1" style={{ color: B.muted }}>Sign in to view and manage your invoices</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl p-8"
            style={{ border: `1px solid ${B.border}`, boxShadow: '0 8px 32px rgba(15,45,94,0.10)' }}>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="relative">
                <input id="email" type="email" placeholder=" " autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="peer w-full rounded-xl px-4 pt-6 pb-3 text-sm focus:outline-none transition-colors"
                  style={{ background: B.lightBg, border: `1.5px solid ${B.border}`, color: B.text }} />
                <label htmlFor="email"
                  className="absolute left-4 top-2 text-xs font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                  style={{ color: B.muted }}>
                  Email address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input id="password" type={showPw ? 'text' : 'password'} placeholder=" " autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="peer w-full rounded-xl px-4 pt-6 pb-3 pr-11 text-sm focus:outline-none transition-colors"
                  style={{ background: B.lightBg, border: `1.5px solid ${B.border}`, color: B.text }} />
                <label htmlFor="password"
                  className="absolute left-4 top-2 text-xs font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                  style={{ color: B.muted }}>
                  Password
                </label>
                <button type="button" onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors hover:bg-slate-100"
                  style={{ color: B.muted }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm rounded-xl px-4 py-3"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                  {error}
                </p>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0"
                style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})`, boxShadow: `0 4px 16px rgba(30,92,191,0.3)` }}>
                {loading
                  ? <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  : <LogIn className="w-4 h-4" />}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>

              <p className="text-center text-xs" style={{ color: B.muted }}>
                Any email and password will work for this demo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
