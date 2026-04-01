import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Website layouts & pages
import WebsiteLayout from './components/WebsiteLayout';
import Home from './pages/website/Home';
import About from './pages/website/About';
import Contact from './pages/website/Contact';
import Login from './pages/website/Login';

// Invoicer portal layout & pages
import Layout from './components/Layout';
import Invoices from './pages/Invoices';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceDetail from './pages/InvoiceDetails';
import CompanySettings from './pages/CompanySettings';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>

            {/* ── Public website ── */}
            <Route element={<WebsiteLayout />}>
              <Route path="/"        element={<Home />}    />
              <Route path="/about"   element={<About />}   />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* ── Login (standalone, no outer layout) ── */}
            <Route path="/login" element={<Login />} />

            {/* ── Protected invoicer portal ── */}
            <Route path="/portal" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index                    element={<Invoices />}       />
              <Route path="invoices/create"   element={<CreateInvoice />}  />
              <Route path="invoices/:id"      element={<InvoiceDetail />}  />
              <Route path="settings"          element={<CompanySettings />}/>
            </Route>

            {/* ── 404 ── */}
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
