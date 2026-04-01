import { format } from "date-fns";
import StatusBadge from "./StatusBadge";

export default function InvoicePreview({ invoice, company }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(val || 0);
  };

  return (
    <div className="bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-none">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex items-start gap-4">
            {company?.company_logo && (
              <img
                src={company.company_logo}
                alt={company.company_name}
                className="w-14 h-14 object-contain rounded-lg"
              />
            )}
            <div>
              <h1 className="text-xl font-display font-bold text-slate-900">
                {company?.company_name || "Your Company"}
              </h1>
              {company?.company_address && (
                <p className="text-sm text-slate-500 mt-1">{company.company_address}</p>
              )}
              {(company?.company_city || company?.company_country) && (
                <p className="text-sm text-slate-500">
                  {[company.company_city, company.company_country].filter(Boolean).join(", ")}
                </p>
              )}
              {company?.company_email && (
                <p className="text-sm text-slate-500">{company.company_email}</p>
              )}
              {company?.company_phone && (
                <p className="text-sm text-slate-500">{company.company_phone}</p>
              )}
              {company?.company_registration && (
                <p className="text-xs text-slate-400 mt-1">Reg: {company.company_registration}</p>
              )}
              {company?.company_vat_number && (
                <p className="text-xs text-slate-400">VAT: {company.company_vat_number}</p>
              )}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="flex items-center gap-3 sm:justify-end">
              <h2 className="text-2xl font-display font-bold tracking-tight text-primary">INVOICE</h2>
              <StatusBadge status={invoice.status || "draft"} />
            </div>
            <p className="text-sm font-mono text-slate-500 mt-2">#{invoice.invoice_number}</p>
            <div className="mt-3 space-y-1 text-sm text-slate-500">
              <p>Issued: {invoice.issue_date ? format(new Date(invoice.issue_date), "dd MMM yyyy") : "—"}</p>
              <p>Due: {invoice.due_date ? format(new Date(invoice.due_date), "dd MMM yyyy") : "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">Bill To</p>
        <p className="font-semibold text-slate-900">
          {invoice.client_name} {invoice.client_surname}
        </p>
        {invoice.client_email && (
          <p className="text-sm text-slate-500">{invoice.client_email}</p>
        )}
        {invoice.client_address && (
          <p className="text-sm text-slate-500 mt-1">{invoice.client_address}</p>
        )}
      </div>

      {/* Line Items */}
      <div className="px-8 py-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-xs font-medium uppercase tracking-wider text-slate-400 pb-3">Description</th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-slate-400 pb-3 w-20">Qty</th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-slate-400 pb-3 w-28">Price</th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-slate-400 pb-3 w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.line_items || []).map((item, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-3 text-sm text-slate-700">{item.description || "—"}</td>
                <td className="py-3 text-sm text-slate-500 text-right tabular-nums">{item.quantity}</td>
                <td className="py-3 text-sm text-slate-500 text-right tabular-nums">{formatCurrency(item.unit_price)}</td>
                <td className="py-3 text-sm font-medium text-slate-900 text-right tabular-nums">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="px-8 py-6 border-t border-slate-200">
        <div className="flex justify-end">
          <div className="w-full sm:w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium tabular-nums">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">VAT ({invoice.vat_rate || 0}%)</span>
              <span className="font-medium tabular-nums">{formatCurrency(invoice.vat_amount)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-slate-200">
              <span>Total Due</span>
              <span className="text-primary tabular-nums">{formatCurrency(invoice.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      {(invoice.payment_details || company?.default_payment_details) && (
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">Payment Details</p>
          <p className="text-sm text-slate-600 whitespace-pre-line">
            {invoice.payment_details || company?.default_payment_details}
          </p>
        </div>
      )}

      {/* Notes */}
      {invoice.notes && (
        <div className="px-8 py-4 border-t border-slate-100">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">Notes</p>
          <p className="text-sm text-slate-500">{invoice.notes}</p>
        </div>
      )}

      {/* Disclaimer */}
      {company?.disclaimer && (
        <div className="px-8 py-5 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-400 text-center leading-relaxed">{company.disclaimer}</p>
        </div>
      )}
    </div>
  );
}