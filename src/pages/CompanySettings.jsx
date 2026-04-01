import { useState, useEffect } from "react";
import { api } from "@/api/client";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { Save, Upload, Building2, Mail, MapPin, Shield, CreditCard, X } from "lucide-react";
import { toast } from "sonner";

// Same GlassCard as in CreateInvoice
function GlassCard({ icon: Icon, title, accentColor = "rgba(91,141,238,0.22)", children }) {
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
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: accentColor }}
      />
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

export default function CompanySettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingId, setExistingId] = useState(null);
  const [form, setForm] = useState({
    company_name: "",
    company_logo: "",
    company_email: "",
    company_phone: "",
    company_address: "",
    company_city: "",
    company_country: "",
    company_registration: "",
    company_vat_number: "",
    default_vat_rate: 15,
    default_payment_details: "",
    disclaimer: "",
  });

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => {
    const settings = await api.settings.list();
    if (settings.length > 0) {
      setExistingId(settings[0].id);
      setForm({
        company_name: settings[0].company_name || "",
        company_logo: settings[0].company_logo || "",
        company_email: settings[0].company_email || "",
        company_phone: settings[0].company_phone || "",
        company_address: settings[0].company_address || "",
        company_city: settings[0].company_city || "",
        company_country: settings[0].company_country || "",
        company_registration: settings[0].company_registration || "",
        company_vat_number: settings[0].company_vat_number || "",
        default_vat_rate: settings[0].default_vat_rate || 15,
        default_payment_details: settings[0].default_payment_details || "",
        disclaimer: settings[0].disclaimer || "",
      });
    }
    setLoading(false);
  };

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { file_url } = await api.upload(file);
    updateField("company_logo", file_url);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (existingId) {
        await api.settings.update(existingId, form);
      } else {
        const created = await api.settings.create(form);
        setExistingId(created.id);
      }
      toast.success("Company settings saved");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(99,149,235,0.2)", borderTopColor: "#6395eb" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight">Company Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure your company details for invoices</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Branding */}
      <GlassCard icon={Building2} title="Branding" accentColor="rgba(91,141,238,0.22)">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            {form.company_logo ? (
              <div className="relative">
                <img
                  src={form.company_logo}
                  alt="Logo"
                  className="w-20 h-20 rounded-xl object-contain"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                />
                <button
                  onClick={() => updateField("company_logo", "")}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center transition-colors"
                  title="Remove logo"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <Building2 className="w-8 h-8 text-slate-500" />
              </div>
            )}
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              <span className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                <Upload className="w-3 h-3" /> {form.company_logo ? "Replace" : "Upload"}
              </span>
            </label>
          </div>
          <div className="flex-1">
            <FloatingInput
              id="company_name"
              label="Company Name"
              value={form.company_name}
              onChange={(e) => updateField("company_name", e.target.value)}
            />
          </div>
        </div>
      </GlassCard>

      {/* Contact */}
      <GlassCard icon={Mail} title="Contact" accentColor="rgba(124,58,237,0.20)">
        <p className="text-xs text-slate-400 -mt-2 mb-3">Your business contact details — shown on invoices. Customer emails are entered per invoice.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput
            id="company_email"
            label="Your Business Email"
            type="email"
            value={form.company_email}
            onChange={(e) => updateField("company_email", e.target.value)}
          />
          <FloatingInput
            id="company_phone"
            label="Phone"
            value={form.company_phone}
            onChange={(e) => updateField("company_phone", e.target.value)}
          />
        </div>
      </GlassCard>

      {/* Location */}
      <GlassCard icon={MapPin} title="Location" accentColor="rgba(16,185,129,0.18)">
        <FloatingInput
          id="company_address"
          label="Address"
          value={form.company_address}
          onChange={(e) => updateField("company_address", e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <FloatingInput
            id="company_city"
            label="City"
            value={form.company_city}
            onChange={(e) => updateField("company_city", e.target.value)}
          />
          <FloatingInput
            id="company_country"
            label="Country"
            value={form.company_country}
            onChange={(e) => updateField("company_country", e.target.value)}
          />
        </div>
      </GlassCard>

      {/* Legal & Tax */}
      <GlassCard icon={Shield} title="Legal & Tax" accentColor="rgba(245,158,11,0.15)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput
            id="company_registration"
            label="Registration Number"
            value={form.company_registration}
            onChange={(e) => updateField("company_registration", e.target.value)}
          />
          <FloatingInput
            id="company_vat_number"
            label="VAT Number"
            value={form.company_vat_number}
            onChange={(e) => updateField("company_vat_number", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <FloatingInput
            id="default_vat_rate"
            label="Default VAT Rate (%)"
            type="number"
            value={form.default_vat_rate}
            onChange={(e) => updateField("default_vat_rate", parseFloat(e.target.value) || 0)}
          />
        </div>
      </GlassCard>

      {/* Defaults */}
      <GlassCard icon={CreditCard} title="Defaults" accentColor="rgba(59,130,246,0.18)">
        <FloatingInput
          id="default_payment_details"
          label="Default Payment Details"
          type="textarea"
          value={form.default_payment_details}
          onChange={(e) => updateField("default_payment_details", e.target.value)}
          rows={4}
        />
        <div className="mt-4">
          <FloatingInput
            id="disclaimer"
            label="Invoice Disclaimer"
            type="textarea"
            value={form.disclaimer}
            onChange={(e) => updateField("disclaimer", e.target.value)}
            rows={3}
          />
        </div>
      </GlassCard>

      <div className="flex justify-end pb-8">
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
