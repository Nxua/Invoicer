import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

// List settings (there is normally only one row)
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM company_settings ORDER BY created_date DESC').all();
  res.json(rows);
});

// Create settings
router.post('/', (req, res) => {
  const d = req.body;
  const result = db.prepare(`
    INSERT INTO company_settings
      (company_name, company_logo, company_email, company_phone, company_address,
       company_city, company_country, company_registration, company_vat_number,
       default_vat_rate, default_payment_details, disclaimer)
    VALUES
      (@company_name, @company_logo, @company_email, @company_phone, @company_address,
       @company_city, @company_country, @company_registration, @company_vat_number,
       @default_vat_rate, @default_payment_details, @disclaimer)
  `).run({
    company_name: d.company_name || '',
    company_logo: d.company_logo || '',
    company_email: d.company_email || '',
    company_phone: d.company_phone || '',
    company_address: d.company_address || '',
    company_city: d.company_city || '',
    company_country: d.company_country || '',
    company_registration: d.company_registration || '',
    company_vat_number: d.company_vat_number || '',
    default_vat_rate: d.default_vat_rate || 15,
    default_payment_details: d.default_payment_details || '',
    disclaimer: d.disclaimer || '',
  });
  res.json(db.prepare('SELECT * FROM company_settings WHERE id = ?').get(result.lastInsertRowid));
});

// Update settings
router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM company_settings WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Settings not found' });
  const merged = { ...existing, ...req.body };
  db.prepare(`
    UPDATE company_settings SET
      company_name=@company_name, company_logo=@company_logo, company_email=@company_email,
      company_phone=@company_phone, company_address=@company_address, company_city=@company_city,
      company_country=@company_country, company_registration=@company_registration,
      company_vat_number=@company_vat_number, default_vat_rate=@default_vat_rate,
      default_payment_details=@default_payment_details, disclaimer=@disclaimer
    WHERE id=@id
  `).run({ ...merged, id: req.params.id });
  res.json(db.prepare('SELECT * FROM company_settings WHERE id = ?').get(req.params.id));
});

export default router;
