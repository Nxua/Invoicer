import { DatabaseSync } from 'node:sqlite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '../../data');
mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(join(dataDir, 'invoicer.db'));

db.exec(`PRAGMA journal_mode = WAL`);
db.exec(`PRAGMA foreign_keys = ON`);

db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    client_name TEXT,
    client_surname TEXT,
    client_email TEXT,
    client_address TEXT,
    issue_date TEXT,
    due_date TEXT,
    line_items TEXT DEFAULT '[]',
    subtotal REAL DEFAULT 0,
    vat_rate REAL DEFAULT 15,
    vat_amount REAL DEFAULT 0,
    total_amount REAL DEFAULT 0,
    payment_details TEXT,
    notes TEXT,
    created_date TEXT DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS company_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT,
    company_logo TEXT,
    company_email TEXT,
    company_phone TEXT,
    company_address TEXT,
    company_city TEXT,
    company_country TEXT,
    company_registration TEXT,
    company_vat_number TEXT,
    default_vat_rate REAL DEFAULT 15,
    default_payment_details TEXT,
    disclaimer TEXT,
    created_date TEXT DEFAULT (datetime('now'))
  )
`);

export default db;
