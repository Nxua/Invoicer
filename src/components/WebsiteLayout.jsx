import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, LogIn, LogOut, FileText, Phone } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

// ── Brand tokens ──────────────────────────────────────────
const B = {
  navy:       '#0f2d5e',   // deep navy
  blue:       '#1e5cbf',   // royal blue
  blueHover:  '#1749a0',
  sky:        '#2e8bdb',   // lighter accent
  lightBg:    '#f0f5fc',   // very light blue-grey page bg
  panelBg:    '#e8f0fb',   // slightly darker panel
  border:     '#c8d9f0',
  text:       '#0c1f3d',
  muted:      '#4a6080',
};

export default function WebsiteLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/',        label: 'Home'    },
    { path: '/about',   label: 'About'   },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    // White/light-blue full-page wrapper — overrides dark body bg
    <div className="min-h-screen" style={{ background: B.lightBg, color: B.text }}>

      {/* ── Top utility bar ── */}
      <div className="hidden md:block py-1.5 px-6 text-xs font-medium"
        style={{ background: B.navy, color: 'rgba(255,255,255,0.75)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>PIRB Licensed Master Plumber · Reg. #12345</span>
          <a href="tel:+27210000000" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3 h-3" /> 021 000 0000
          </a>
        </div>
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white"
        style={{ borderBottom: `1px solid ${B.border}`, boxShadow: '0 2px 12px rgba(15,45,94,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})`, boxShadow: `0 2px 8px rgba(30,92,191,0.35)` }}>
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none">
              <span className="font-display font-bold text-lg block" style={{ color: B.navy }}>CapePlumb</span>
              <span className="text-[10px] font-medium tracking-wide" style={{ color: B.muted }}>Professional Plumbing</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link key={path} to={path}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                  style={active
                    ? { color: B.blue, background: `${B.blue}12` }
                    : { color: B.muted }
                  }
                  onMouseEnter={(e) => { if (!active) { e.target.style.color = B.navy; e.target.style.background = B.panelBg; }}}
                  onMouseLeave={(e) => { if (!active) { e.target.style.color = B.muted; e.target.style.background = 'transparent'; }}}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/portal"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{ color: B.blue, border: `1px solid ${B.border}`, background: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = B.panelBg}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                  <FileText className="w-4 h-4" /> My Invoices
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: B.muted }}
                  onMouseEnter={(e) => e.currentTarget.style.color = B.navy}
                  onMouseLeave={(e) => e.currentTarget.style.color = B.muted}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})`, boxShadow: `0 3px 12px rgba(30,92,191,0.35)` }}>
                <LogIn className="w-4 h-4" /> Client Login
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: B.muted }}
            onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white px-6 pb-5 space-y-0.5"
            style={{ borderTop: `1px solid ${B.border}` }}>
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ color: location.pathname === path ? B.blue : B.muted }}>
                {label}
              </Link>
            ))}
            <div className="pt-3" style={{ borderTop: `1px solid ${B.border}` }}>
              {isAuthenticated ? (
                <>
                  <Link to="/portal" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                    style={{ color: B.blue }}>
                    <FileText className="w-4 h-4" /> My Invoices
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm w-full text-left"
                    style={{ color: B.muted }}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold"
                  style={{ color: B.blue }}>
                  <LogIn className="w-4 h-4" /> Client Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: B.navy, color: 'rgba(255,255,255,0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">CapePlumb</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Cape Town&rsquo;s trusted master plumber since 2009.
              Licensed, insured and COC certified.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Quick Links</p>
            <div className="space-y-1.5">
              {[['/', 'Home'], ['/about', 'About Us'], ['/contact', 'Contact'], ['/login', 'Client Portal']].map(([path, label]) => (
                <Link key={path} to={path} className="block text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Contact</p>
            <div className="space-y-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              <p>021 000 0000</p>
              <p>info@capeplumb.co.za</p>
              <p>12 Pipe St, Observatory, Cape Town</p>
              <p className="text-xs pt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>PIRB Reg. #12345</p>
            </div>
          </div>
        </div>
        <div className="border-t px-6 py-4" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
          <div className="max-w-6xl mx-auto text-center text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2025 CapePlumb. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
