import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

const parseInvoice = (row) => row ? { ...row, line_items: JSON.parse(row.line_items || '[]') } : null;

// List all invoices, newest first
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM invoices ORDER BY created_date DESC').all();
  res.json(rows.map(parseInvoice));
});

// Get single invoice by id
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Invoice not found' });
  res.json(parseInvoice(row));
});

// Create invoice
router.post('/', (req, res) => {
  const d = req.body;
  const result = db.prepare(`
    INSERT INTO invoices
      (invoice_number, status, client_name, client_surname, client_email, client_address,
       issue_date, due_date, line_items, subtotal, vat_rate, vat_amount, total_amount,
       payment_details, notes)
    VALUES
      (@invoice_number, @status, @client_name, @client_surname, @client_email, @client_address,
       @issue_date, @due_date, @line_items, @subtotal, @vat_rate, @vat_amount, @total_amount,
       @payment_details, @notes)
  `).run({
    invoice_number: d.invoice_number || '',
    status: d.status || 'draft',
    client_name: d.client_name || '',
    client_surname: d.client_surname || '',
    client_email: d.client_email || '',
    client_address: d.client_address || '',
    issue_date: d.issue_date || '',
    due_date: d.due_date || '',
    line_items: JSON.stringify(d.line_items || []),
    subtotal: d.subtotal || 0,
    vat_rate: d.vat_rate || 15,
    vat_amount: d.vat_amount || 0,
    total_amount: d.total_amount || 0,
    payment_details: d.payment_details || '',
    notes: d.notes || '',
  });
  res.json(parseInvoice(db.prepare('SELECT * FROM invoices WHERE id = ?').get(result.lastInsertRowid)));
});

// Update invoice (partial — only fields provided are updated)
router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Invoice not found' });
  const merged = { ...existing, ...req.body };
  const lineItems = Array.isArray(merged.line_items)
    ? JSON.stringify(merged.line_items)
    : merged.line_items; // already a string from the DB row
  db.prepare(`
    UPDATE invoices SET
      invoice_number=@invoice_number, status=@status, client_name=@client_name,
      client_surname=@client_surname, client_email=@client_email, client_address=@client_address,
      issue_date=@issue_date, due_date=@due_date, line_items=@line_items,
      subtotal=@subtotal, vat_rate=@vat_rate, vat_amount=@vat_amount, total_amount=@total_amount,
      payment_details=@payment_details, notes=@notes
    WHERE id=@id
  `).run({
    id: req.params.id,
    invoice_number: merged.invoice_number,
    status: merged.status,
    client_name: merged.client_name,
    client_surname: merged.client_surname,
    client_email: merged.client_email,
    client_address: merged.client_address,
    issue_date: merged.issue_date,
    due_date: merged.due_date,
    line_items: lineItems,
    subtotal: merged.subtotal,
    vat_rate: merged.vat_rate,
    vat_amount: merged.vat_amount,
    total_amount: merged.total_amount,
    payment_details: merged.payment_details,
    notes: merged.notes,
  });
  res.json(parseInvoice(db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)));
});

// Delete invoice
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM invoices WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
