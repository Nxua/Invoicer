import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Printer, Trash2, Send } from "lucide-react";
import InvoicePreview from "../components/invoice/InvoicePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    const [inv, settings] = await Promise.all([
      api.invoices.get(id),
      api.settings.list(),
    ]);
    if (inv) setInvoice(inv);
    if (settings.length > 0) setCompany(settings[0]);
    setLoading(false);
  };

  const handleStatusChange = async (status) => {
    await api.invoices.update(id, { status });
    setInvoice((prev) => ({ ...prev, status }));
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    await api.invoices.delete(id);
    navigate("/portal");
  };

  const handlePrint = () => {
    window.print();
  };

  // Generates the invoice as a base64-encoded PDF (no upload needed)
  const generatePDFBase64 = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    return pdf.output('datauristring').split(',')[1]; // base64 only
  };

  const handleSendEmail = async () => {
    if (!invoice.client_email) return;
    setSending(true);
    const pdfBase64 = await generatePDFBase64();
    await api.email.send({
      to: invoice.client_email,
      subject: `Invoice #${invoice.invoice_number} from ${company?.company_name || 'Us'}`,
      body: `Dear ${invoice.client_name} ${invoice.client_surname},\n\nPlease find your invoice #${invoice.invoice_number} for a total of R${(invoice.total_amount || 0).toFixed(2)} attached.\n\nDue date: ${invoice.due_date || 'N/A'}\n\n${invoice.payment_details ? 'Payment Details:\n' + invoice.payment_details + '\n\n' : ''}Thank you for your business.\n\nKind regards,\n${company?.company_name || ''}`,
      pdf_base64: pdfBase64,
      pdf_filename: `Invoice-${invoice.invoice_number}.pdf`,
    });
    await handleStatusChange('sent');
    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Invoice not found.</p>
        <Link to="/"><Button variant="link">Go back</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/portal">
            <Button variant="ghost" size="icon" className="rounded-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">
              Invoice #{invoice.invoice_number}
            </h1>
            <p className="text-sm text-muted-foreground">
              {invoice.client_name} {invoice.client_surname}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={invoice.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-32">
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
          <Button variant="outline" onClick={handleSendEmail} disabled={sending || !invoice.client_email} className="gap-2">
            <Send className="w-4 h-4" /> {sending ? "Sending..." : "Email"}
          </Button>
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="outline" onClick={handleDelete} className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      <div ref={previewRef}>
        <InvoicePreview invoice={invoice} company={company} />
      </div>
    </div>
  );
}
