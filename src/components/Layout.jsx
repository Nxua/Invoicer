import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, Settings, Plus, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function Layout() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: "/portal", label: "Invoices", icon: FileText },
    { path: "/portal/invoices/create", label: "New Invoice", icon: Plus },
    { path: "/portal/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen">

      {/* Decorative background orbs — fixed, layered depth */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -left-48 w-[700px] h-[700px] rounded-full bg-blue-600/30 blur-[140px]" />
        <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] rounded-full bg-indigo-500/25 blur-[130px]" />
        <div className="absolute -bottom-64 left-1/4 w-[550px] h-[550px] rounded-full bg-violet-500/25 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-[90px]" />
      </div>

      {/* Header */}
      <header
        className="no-print sticky top-0 z-50 border-b"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.07) 100%)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          borderBottomColor: "rgba(255,255,255,0.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Back to website */}
            <Link to="/" className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors mr-2">
              <ArrowLeft className="w-3 h-3" /> Site
            </Link>

            {/* Logo */}
            <Link to="/portal" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #5b8dee 0%, #7c3aed 100%)",
                  boxShadow: "0 0 16px rgba(91,141,238,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-white transition-colors">
                Invoicer
              </span>
            </Link>

            {/* Logout */}
            <button onClick={handleLogout} title="Sign out"
              className="ml-2 p-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>

            {/* Pill navigation */}
            <nav
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === "/portal"
                  ? location.pathname === "/portal"
                  : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={isActive ? {
                      background: "linear-gradient(135deg, rgba(91,141,238,0.4) 0%, rgba(124,58,237,0.3) 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 12px rgba(91,141,238,0.2), 0 2px 8px rgba(0,0,0,0.25)",
                      border: "1px solid rgba(91,141,238,0.3)",
                    } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
