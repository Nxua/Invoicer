import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import invoiceRoutes from './routes/invoices.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes from './routes/upload.js';
import emailRoutes from './routes/email.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20mb' })); // Large limit to handle base64 PDF attachments
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (logos, etc.)
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// API routes
app.use('/api/invoices', invoiceRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/email', emailRoutes);

// In production (cPanel), serve the built React frontend from dist/
const distPath = join(__dirname, '../dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Invoicer server running on port ${PORT}`);
});
