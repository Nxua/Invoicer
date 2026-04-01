import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import LineItemsEditor from "../components/invoice/LineItemsEditior";
import InvoicePreview from "../components/invoice/InvoicePreview";

// Glow-orb card section wrapper
function GlassCard({ icon: Icon, title, accentColor = "rgba(91,141,238,0.25)", children }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 space-y-5"
      style={{
        background: "rgba(10,15,35,0.6)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.4)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Inner glow orb */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ background: accentColor }}
      />
      {/* Section header */}
      <div className="relative flex items-center gap-3 pb-4 border-b border-white/8">
        {Icon && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
            style={{ background: accentColor, border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
        )}
        <p className="font-semibold text-sm text-neutral-200">{title}</p>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [company, setCompany] = useState(null);

  const [form, setForm] = useState({
    invoice_number: "",
    status: "draft",
    client_name: "",
    client_surname: "",
    client_email: "",
    client_address: "",
    issue_date: new Date().toISOString().split("T")[0],
    due_date: "",
    line_items: [{ description: "", quantity: 1, unit_price: 0, amount: 0 }],
    vat_rate: 15,
    payment_details: "",
    notes: "",
  });

  useEffect(() => {
    loadCompany();
    generateInvoiceNumber();
  }, []);

  const loadCompany = async () => {
    const settings = await api.settings.list();
    if (settings.length > 0) {
      setCompany(settings[0]);
      setForm((prev) => ({
        ...prev,
        vat_rate: settings[0].default_vat_rate || 15,
        payment_details: settings[0].default_payment_details || "",
      }));
    }
  };

  const generateInvoiceNumber = () => {
    const num = `INV-${Date.now().toString().slice(-6)}`;
    setForm((prev) => ({ ...prev, invoice_number: num }));
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = (form.line_items || []).reduce((sum, item) => sum + (item.amount || 0), 0);
  const vatAmount = subtotal * ((form.vat_rate || 0) / 100);
  const totalAmount = subtotal + vatAmount;

  const computedInvoice = { ...form, subtotal, vat_amount: vatAmount, total_amount: totalAmount };

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, subtotal, vat_amount: vatAmount, total_amount: totalAmount };
    const created = await api.invoices.create(data);
    navigate(`/portal/invoices/${created.id}`);
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(val || 0);

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setShowPreview(false)} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Editor
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Invoice"}
          </Button>
        </div>
        <InvoicePreview invoice={computedInvoice} company={company} />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">New Invoice</h1>
            <p className="text-sm text-muted-foreground">Fill in the details below</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2">
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Invoice Details */}
      <GlassCard title="Invoice Details" accentColor="rgba(91,141,238,0.22)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FloatingInput
            id="invoice_number"
            label="Invoice Number"
            value={form.invoice_number}
            onChange={(e) => updateField("invoice_number", e.target.value)}
          />
          <FloatingInput
            id="issue_date"
            label="Issue Date"
            type="date"
            value={form.issue_date}
            onChange={(e) => updateField("issue_date", e.target.value)}
          />
          <FloatingInput
            id="due_date"
            label="Due Date"
            type="date"
            value={form.due_date}
            onChange={(e) => updateField("due_date", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="text-xs text-slate-400 mb-1.5 block">Status</label>
          <Select value={form.status} onValueChange={(val) => updateField("status", val)}>
            <SelectTrigger className="rounded-xl bg-black/25 border-white/12 h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GlassCard>

      {/* Client Info */}
      <GlassCard title="Client Information" accentColor="rgba(124,58,237,0.20)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput
            id="client_name"
            label="First Name"
            value={form.client_name}
            onChange={(e) => updateField("client_name", e.target.value)}
          />
          <FloatingInput
            id="client_surname"
            label="Surname"
            value={form.client_surname}
            onChange={(e) => updateField("client_surname", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <FloatingInput
            id="client_email"
            label="Email"
            type="email"
            value={form.client_email}
            onChange={(e) => updateField("client_email", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <FloatingInput
            id="client_address"
            label="Address"
            type="textarea"
            value={form.client_address}
            onChange={(e) => updateField("client_address", e.target.value)}
            rows={2}
          />
        </div>
      </GlassCard>

      {/* Line Items */}
      <GlassCard title="Line Items" accentColor="rgba(16,185,129,0.18)">
        <LineItemsEditor
          items={form.line_items}
          onChange={(items) => updateField("line_items", items)}
        />
        <div className="border-t border-white/8 pt-4 mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">VAT</span>
              <input
                type="number"
                className="w-16 h-7 text-xs text-center rounded-lg px-2"
                value={form.vat_rate}
                onChange={(e) => updateField("vat_rate", parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
              />
              <span className="text-muted-foreground">%</span>
            </div>
            <span className="font-medium tabular-nums">{formatCurrency(vatAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/8">
            <span>Total</span>
            <span className="text-blue-400 tabular-nums">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </GlassCard>

      {/* Payment & Notes */}
      <GlassCard title="Payment & Notes" accentColor="rgba(251,191,36,0.12)">
        <FloatingInput
          id="payment_details"
          label="Payment Details"
          type="textarea"
          value={form.payment_details}
          onChange={(e) => updateField("payment_details", e.target.value)}
          rows={3}
        />
        <div className="mt-4">
          <FloatingInput
            id="notes"
            label="Notes"
            type="textarea"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            rows={2}
          />
        </div>
      </GlassCard>

      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2">
          <Eye className="w-4 h-4" /> Preview
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Invoice"}
        </Button>
      </div>
    </div>
  );
}
