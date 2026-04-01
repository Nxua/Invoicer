import { CheckCircle, Award, Users, Wrench } from 'lucide-react';

const B = {
  navy:    '#0f2d5e',
  blue:    '#1e5cbf',
  lightBg: '#f0f5fc',
  panelBg: '#e8f0fb',
  border:  '#c8d9f0',
  text:    '#0c1f3d',
  muted:   '#4a6080',
};

const milestones = [
  { year: '2009', text: 'Founded by Mike van der Berg after 10 years with a national plumbing group.' },
  { year: '2013', text: 'Expanded to a team of 5 — taking on commercial and industrial contracts.' },
  { year: '2017', text: 'Achieved PIRB master plumber registration. COC certificates now in-house.' },
  { year: '2021', text: 'Launched 24/7 emergency line — 60-minute response anywhere in Cape Town.' },
  { year: '2024', text: '500+ completed jobs and counting. Digital invoicing for every client.' },
];

const team = [
  { name: 'Mike van der Berg', role: 'Master Plumber & Owner',   initials: 'MV', bg: B.blue    },
  { name: 'Thabo Khumalo',     role: 'Senior Plumber',           initials: 'TK', bg: '#1d4ed8' },
  { name: 'Dean Jacobs',       role: 'Drainage Specialist',      initials: 'DJ', bg: '#0369a1' },
  { name: 'Carla Fourie',      role: 'Admin & Client Relations', initials: 'CF', bg: '#0284c7' },
];

const values = [
  { icon: Award,  bg: '#dbeafe', iconBg: '#bfdbfe', iconColor: B.blue,    title: 'Quality First',      desc: 'We only use materials and brands we would install in our own homes.' },
  { icon: Users,  bg: '#dbeafe', iconBg: '#bfdbfe', iconColor: B.blue,    title: 'Honest Pricing',     desc: 'Written quotes before work starts. No surprise extras, ever.' },
  { icon: Wrench, bg: '#dbeafe', iconBg: '#bfdbfe', iconColor: B.blue,    title: 'Long-term Thinking', desc: 'We fix root causes, not symptoms. Repairs that last years, not weeks.' },
];

export default function About() {
  return (
    <div>

      {/* ── Hero ── */}
      <section style={{ background: `linear-gradient(135deg, ${B.navy} 0%, #1a3f7a 60%, ${B.blue} 100%)` }}
        className="relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f0f5fc]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
        <div className="max-w-3xl mx-auto px-6 py-28 text-center relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#7dd3fc' }}>Our Story</p>
          <h1 className="text-5xl font-display font-bold text-white mb-5">
            15 years fixing Cape Town&rsquo;s pipes
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
            CapePlumb was founded in 2009 with one promise — show up, fix the problem,
            leave the place cleaner than you found it. That still drives everything we do.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6" style={{ background: B.lightBg }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-white rounded-2xl p-7"
                style={{ border: `1px solid ${B.border}`, boxShadow: '0 2px 8px rgba(15,45,94,0.06)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: v.iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: v.iconColor }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: B.navy }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: B.muted }}>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: B.blue }}>Since 2009</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: B.navy }}>Our journey</h2>
          </div>
          <div className="relative space-y-8">
            <div className="absolute left-[60px] top-2 bottom-2 w-0.5"
              style={{ background: `linear-gradient(to bottom, ${B.blue}, ${B.border})` }} />
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 items-start">
                <div className="w-[60px] flex-shrink-0 text-right">
                  <span className="text-sm font-bold" style={{ color: B.blue }}>{m.year}</span>
                </div>
                <div className="relative pl-2">
                  <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-2 bg-white"
                    style={{ borderColor: B.blue }} />
                  <p className="text-sm leading-relaxed" style={{ color: B.text }}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 px-6 pb-28" style={{ background: B.lightBg }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: B.blue }}>The People Behind the Work</p>
            <h2 className="text-3xl font-display font-bold" style={{ color: B.navy }}>Meet the team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ border: `1px solid ${B.border}`, boxShadow: '0 2px 8px rgba(15,45,94,0.06)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4"
                  style={{ background: member.bg, boxShadow: `0 4px 16px ${member.bg}55` }}>
                  {member.initials}
                </div>
                <p className="font-bold text-sm" style={{ color: B.navy }}>{member.name}</p>
                <p className="text-xs mt-0.5" style={{ color: B.muted }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
