import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "../components/invoice/StatusBadge";

const STATUS_OPTIONS = [
  { value: "draft",     label: "Draft",     dot: "bg-slate-400"   },
  { value: "sent",      label: "Sent",      dot: "bg-blue-400"    },
  { value: "paid",      label: "Paid",      dot: "bg-emerald-400" },
  { value: "overdue",   label: "Overdue",   dot: "bg-red-400"     },
  { value: "cancelled", label: "Cancelled", dot: "bg-gray-500"    },
];

function StatusDropdown({ invoiceId, currentStatus, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
    }
    setOpen((o) => !o);
  };

  const handleSelect = async (e, newStatus) => {
    e.preventDefault();
    e.stopPropagation();
    if (newStatus === currentStatus) { setOpen(false); return; }
    setUpdating(true);
    try {
      await api.invoices.update(invoiceId, { status: newStatus });
      onStatusChange(invoiceId, newStatus);
    } finally {
      setUpdating(false);
      setOpen(false);
    }
  };

  return (
    <div onClick={(e) => e.preventDefault()}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        disabled={updating}
        className="flex items-center"
        title="Change status"
      >
        {updating ? (
          <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
        ) : (
          <StatusBadge status={currentStatus} />
        )}
      </button>

      {open && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200]"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }}
          />
          {/* Dropdown */}
          <div
            className="fixed z-[201] w-36 rounded-xl overflow-hidden"
            style={{ top: pos.top, right: pos.right, background: 'rgba(10,15,35,0.95)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(24px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)' }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={(e) => handleSelect(e, opt.value)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left transition-colors hover:bg-white/8 ${opt.value === currentStatus ? 'text-white' : 'text-slate-300'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${opt.dot}`} />
                {opt.label}
                {opt.value === currentStatus && <span className="ml-auto text-blue-400">✓</span>}
              </button>
            ))}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { loadInvoices(); }, []);

  const loadInvoices = async () => {
    setLoading(true);
    const data = await api.invoices.list();
    setInvoices(data);
    setLoading(false);
  };

  const handleStatusChange = (invoiceId, newStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => inv.id === invoiceId ? { ...inv, status: newStatus } : inv)
    );
  };

  const filtered = invoices.filter((inv) => {
    const term = search.toLowerCase();
    return (
      !term ||
      inv.invoice_number?.toLowerCase().includes(term) ||
      inv.client_name?.toLowerCase().includes(term) ||
      inv.client_surname?.toLowerCase().includes(term) ||
      inv.client_email?.toLowerCase().includes(term)
    );
  });

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(val || 0);

  const totalRevenue  = invoices.filter(i => i.status === "paid").reduce((s, i) => s + (i.total_amount || 0), 0);
  const outstanding   = invoices.filter(i => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + (i.total_amount || 0), 0);
  const overdueCount  = invoices.filter(i => i.status === "overdue").length;

  const stats = [
    { label: "Total Invoices",     value: invoices.length,           icon: FileText,     accentClass: "stat-accent-blue",  iconColor: "text-blue-400",    iconBg: "bg-blue-500/15"   },
    { label: "Revenue Collected",  value: formatCurrency(totalRevenue), icon: CheckCircle2, accentClass: "stat-accent-green", iconColor: "text-emerald-400", iconBg: "bg-emerald-500/15"},
    { label: "Outstanding",        value: formatCurrency(outstanding),  icon: Clock,        accentClass: "stat-accent-amber", iconColor: "text-amber-400",   iconBg: "bg-amber-500/15"  },
    { label: "Overdue",            value: overdueCount,               icon: AlertCircle,  accentClass: "stat-accent-red",   iconColor: "text-red-400",     iconBg: "bg-red-500/15"    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(99,149,235,0.2)", borderTopColor: "#6395eb" }} />
      </div>
    );
  }

  return (
    <div className="space-y-7">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link to="/portal/invoices/create">
          <Button className="gap-2"
            style={{ background: "linear-gradient(135deg, #5b8dee 0%, #7c3aed 100%)", boxShadow: "0 0 20px rgba(91,141,238,0.3), inset 0 1px 0 rgba(255,255,255,0.2)", border: "1px solid rgba(91,141,238,0.4)" }}>
            <Plus className="w-4 h-4" /> New Invoice
          </Button>
        </Link>
      </div>

      {/* Stats row */}
      {invoices.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`bg-card rounded-xl border border-border p-4 ${s.accentClass}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1.5 truncate">{s.label}</p>
                    <p className="text-lg font-semibold tabular-nums leading-tight truncate">{s.value}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Invoice list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.10)" }}>
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium">No invoices yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Create your first invoice to get started.</p>
          <Link to="/portal/invoices/create">
            <Button className="mt-4 gap-2"><Plus className="w-4 h-4" /> Create Invoice</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-2.5">
          {filtered.map((inv) => (
            <Link
              key={inv.id}
              to={`/portal/invoices/${inv.id}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card glass-hover"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(91,141,238,0.18), rgba(124,58,237,0.12))", border: "1px solid rgba(91,141,238,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm truncate">
                      {inv.client_name} {inv.client_surname}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="font-mono opacity-70">#{inv.invoice_number}</span>
                    {inv.issue_date && <span>{format(new Date(inv.issue_date), "dd MMM yyyy")}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-semibold tabular-nums text-sm">{formatCurrency(inv.total_amount)}</span>
                {/* Clickable status badge — click to change, don't navigate */}
                <StatusDropdown
                  invoiceId={inv.id}
                  currentStatus={inv.status}
                  onStatusChange={handleStatusChange}
                />
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
