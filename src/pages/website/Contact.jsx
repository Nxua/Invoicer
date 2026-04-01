import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react';

const B = {
  navy:    '#0f2d5e',
  blue:    '#1e5cbf',
  lightBg: '#f0f5fc',
  border:  '#c8d9f0',
  text:    '#0c1f3d',
  muted:   '#4a6080',
};

const FloatingField = ({ id, label, type = 'text', as: As = 'input', value, onChange, required, rows }) => (
  <div className="relative">
    {As === 'textarea' ? (
      <textarea id={id} placeholder=" " required={required} value={value} onChange={onChange} rows={rows || 4}
        className="peer w-full rounded-xl px-4 pt-6 pb-3 text-sm transition-colors resize-none focus:outline-none"
        style={{ background: B.lightBg, border: `1.5px solid ${B.border}`, color: B.text }} />
    ) : (
      <input id={id} type={type} placeholder=" " required={required} value={value} onChange={onChange}
        className="peer w-full rounded-xl px-4 pt-6 pb-3 text-sm transition-colors focus:outline-none"
        style={{ background: B.lightBg, border: `1.5px solid ${B.border}`, color: B.text }} />
    )}
    <label htmlFor={id}
      className="absolute left-4 top-2 text-xs font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      style={{ color: B.muted }}>
      {label}
    </label>
  </div>
);

const contactItems = [
  { icon: Phone,  label: 'Phone',   value: '021 000 0000',         href: 'tel:+27210000000' },
  { icon: Mail,   label: 'Email',   value: 'info@capeplumb.co.za', href: 'mailto:info@capeplumb.co.za' },
  { icon: MapPin, label: 'Address', value: '12 Pipe Street, Observatory, Cape Town, 7925', href: null },
  { icon: Clock,  label: 'Hours',   value: 'Mon–Fri 7am–6pm · Sat 8am–2pm · 24/7 Emergency', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      {/* ── Header banner ── */}
      <section style={{ background: `linear-gradient(135deg, ${B.navy} 0%, #1a3f7a 60%, ${B.blue} 100%)` }}
        className="relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f0f5fc]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#7dd3fc' }}>Get in Touch</p>
          <h1 className="text-4xl font-display font-bold text-white mb-3">Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.70)' }}>
            Emergency callout or just need a quote? We respond within the hour.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-20 px-6 pb-28" style={{ background: B.lightBg }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white flex gap-4 items-start rounded-xl p-4"
                  style={{ border: `1px solid ${B.border}`, boxShadow: '0 2px 6px rgba(15,45,94,0.06)' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#dbeafe' }}>
                    <Icon className="w-4 h-4" style={{ color: B.blue }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: B.muted }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium transition-colors hover:underline"
                        style={{ color: B.text }}>{item.value}</a>
                    ) : (
                      <p className="text-sm" style={{ color: B.text }}>{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8"
            style={{ border: `1px solid ${B.border}`, boxShadow: '0 4px 24px rgba(15,45,94,0.08)' }}>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: '#d1fae5' }}>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: B.navy }}>Message sent!</h3>
                <p className="text-sm" style={{ color: B.muted }}>We&rsquo;ll be in touch within the hour.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="text-sm font-semibold hover:underline" style={{ color: B.blue }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <h2 className="text-lg font-bold mb-6" style={{ color: B.navy }}>Send us a message</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingField id="name"  label="Your name"  value={form.name}  onChange={update('name')}  required />
                  <FloatingField id="phone" label="Phone"      value={form.phone} onChange={update('phone')} />
                </div>
                <FloatingField id="email"   label="Email address" type="email" value={form.email}   onChange={update('email')}   required />
                <FloatingField id="message" label="How can we help?" as="textarea" value={form.message} onChange={update('message')} required rows={4} />

                <button type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                  style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})`, boxShadow: `0 4px 16px rgba(30,92,191,0.3)` }}>
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
