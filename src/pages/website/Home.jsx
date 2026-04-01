import { Link } from 'react-router-dom';
import { Phone, Shield, Clock, Star, CheckCircle, Wrench, Droplets, Flame, ArrowRight, Award } from 'lucide-react';

const B = {
  navy:     '#0f2d5e',
  blue:     '#1e5cbf',
  sky:      '#2e8bdb',
  lightBg:  '#f0f5fc',
  panelBg:  '#e8f0fb',
  border:   '#c8d9f0',
  text:     '#0c1f3d',
  muted:    '#4a6080',
};

const services = [
  { icon: Droplets, title: 'Leak Detection & Repair',  desc: 'Burst pipes, dripping taps, hidden leaks — found and fixed fast.',            color: '#dbeafe', iconColor: B.blue },
  { icon: Flame,    title: 'Geyser Installation',      desc: 'Solar, heat-pump and conventional geyser supply, fitting and certification.',  color: '#fee2e2', iconColor: '#dc2626' },
  { icon: Wrench,   title: 'Drain Unblocking',         desc: 'High-pressure water-jetting clears any blockage, same day.',                   color: '#d1fae5', iconColor: '#059669' },
  { icon: Shield,   title: 'Compliance Certificates',  desc: 'COC certificates issued for all plumbing and gas installations.',              color: '#fef9c3', iconColor: '#ca8a04' },
];

const stats = [
  { val: '15+', label: 'Years experience' },
  { val: '500+', label: 'Jobs completed'  },
  { val: '24/7', label: 'Emergency cover' },
  { val: '100%', label: 'Satisfaction'    },
];

const reasons = [
  'Licensed & insured master plumber',
  '24 / 7 emergency call-out service',
  'Upfront, fixed-price quotes',
  '12-month workmanship guarantee',
  'Digital invoices sent instantly',
];

const reviews = [
  { name: 'Sarah M.', stars: 5, text: 'Fixed our burst geyser within two hours of calling. Excellent service!' },
  { name: 'James T.', stars: 5, text: 'Honest pricing and quality work. Our go-to plumber for three years.'  },
  { name: 'Priya K.', stars: 5, text: "Unblocked our drain on a Sunday. Couldn't ask for more."              },
];

export default function Home() {
  return (
    <div>

      {/* ── Hero ── */}
      <section style={{ background: `linear-gradient(135deg, ${B.navy} 0%, #1a3f7a 60%, #1e5cbf 100%)` }}
        className="relative overflow-hidden">
        {/* Diagonal cut at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f0f5fc]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />

        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.9)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              24 / 7 Emergency Service Available
            </span>

            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight text-white">
              Cape Town&rsquo;s<br />
              <span style={{ color: '#7dd3fc' }}>Trusted</span> Master<br />
              Plumber
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Leaks, geysers, drains and compliance certificates —
              handled professionally and on time, every time.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="tel:+27210000000"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ background: '#2563eb', boxShadow: '0 4px 16px rgba(37,99,235,0.5)' }}>
                <Phone className="w-4 h-4" />
                021 000 0000
              </a>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all duration-200 hover:bg-white"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
                Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl p-8 space-y-5 bg-white"
              style={{ boxShadow: '0 20px 60px rgba(15,45,94,0.25)' }}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl p-4 text-center"
                    style={{ background: B.lightBg, border: `1px solid ${B.border}` }}>
                    <p className="text-2xl font-bold" style={{ color: B.blue }}>{s.val}</p>
                    <p className="text-xs mt-0.5" style={{ color: B.muted }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 flex items-center gap-3"
                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: B.text }}>Licensed Master Plumber</p>
                  <p className="text-xs" style={{ color: B.muted }}>PIRB Reg. #12345 · COC certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 px-6" style={{ background: B.lightBg }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: B.blue }}>What We Do</p>
            <h2 className="text-4xl font-display font-bold" style={{ color: B.navy }}>Our Services</h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: B.muted }}>
              From emergency callouts to planned installations — we cover it all.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: `1px solid ${B.border}`, boxShadow: '0 2px 8px rgba(15,45,94,0.06)' }}>
                  <div className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center"
                    style={{ background: s.color }}>
                    <Icon className="w-5 h-5" style={{ color: s.iconColor }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: B.navy }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: B.muted }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: B.blue }}>Why Choose Us</p>
            <h2 className="text-4xl font-display font-bold mb-8" style={{ color: B.navy }}>Quality work, honest prices</h2>
            <ul className="space-y-4">
              {reasons.map((r) => (
                <li key={r} className="flex items-center gap-3 text-sm" style={{ color: B.text }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#dbeafe' }}>
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: B.blue }} />
                  </div>
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${B.blue}, ${B.navy})`, boxShadow: `0 4px 16px rgba(30,92,191,0.35)` }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.name} className="bg-white rounded-xl p-5"
                style={{ border: `1px solid ${B.border}`, boxShadow: '0 2px 8px rgba(15,45,94,0.06)' }}>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm italic mb-2" style={{ color: B.text }}>&ldquo;{rev.text}&rdquo;</p>
                <p className="text-xs font-semibold" style={{ color: B.muted }}>{rev.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 px-6" style={{ background: B.lightBg }}>
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${B.navy} 0%, ${B.blue} 100%)`, boxShadow: `0 12px 40px rgba(15,45,94,0.3)` }}>
          <div className="p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Got a plumbing problem?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Call now or request a quote — we respond within the hour.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="tel:+27210000000"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Phone className="w-4 h-4" /> 021 000 0000
              </a>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold whitespace-nowrap transition-all duration-200 hover:opacity-90"
                style={{ background: 'white', color: B.navy }}>
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
