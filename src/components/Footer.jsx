import logoMark from '../assets/images/logo-mark-01.png';

const QUICK_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'About Us', view: 'about' },
  { label: 'Services', view: 'services' },
  { label: 'Portfolio', view: 'portfolio' },
  { label: 'Blog', view: 'insights' },
];

const SERVICES_LINKS = [
  'Digital Marketing',
  'Website Development',
  'Branding & Identity',
  'SEO & Analytics',
  'Social Media Marketing',
  'Content Marketing',
];

const INDUSTRIES_LINKS = ['Aviation', 'Engineering', 'SMEs', 'NGOs', 'Startups', 'Technology'];

const SOCIALS = [
  { label: 'LinkedIn', d: 'M4.98 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM.5 8.5h4.5V22H.5zM8.5 8.5h4.3v1.85h.06c.6-1.1 2.06-2.26 4.24-2.26 4.53 0 5.37 2.9 5.37 6.68V22h-4.5v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.66-2.47 3.38V22h-4.5z' },
  { label: 'Instagram', d: 'M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.44 2.53c.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z' },
  { label: 'X', d: 'M18.9 3H22l-7.6 8.7L23 21h-6.8l-5.3-6.9L4.8 21H1.7l8.1-9.3L1 3h7l4.8 6.3z' },
  { label: 'Facebook', d: 'M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.27-1.6 1.63-1.6H17V3.5c-.29-.04-1.28-.13-2.44-.13-2.42 0-4.06 1.47-4.06 4.19v2.35H7.7v3.3h2.8V22z' },
];

export default function Footer({ setView }) {
  return (
    <footer className="bg-charcoal text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1 sm:col-span-2">
          <button onClick={() => setView('home')} className="flex items-center gap-2 mb-4">
            <img src={logoMark} alt="AnCore Marketing logo mark" className="h-8 w-auto" />
            <span className="font-head font-extrabold text-white text-sm">AnCore <span className="text-gold font-semibold">Marketing</span></span>
          </button>
          <p className="text-white/50 leading-relaxed mb-5 max-w-xs">
            Strategic marketing that helps businesses grow, thrive and succeed.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold transition"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <button onClick={() => setView(l.view)} className="hover:text-gold transition">{l.label}</button>
              </li>
            ))}
            <li><button onClick={() => setView('support')} className="hover:text-gold transition">Support</button></li>
            <li><button onClick={() => setView('admin')} className="hover:text-gold transition">Admin Panel</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Services</h4>
          <ul className="space-y-2.5">
            {SERVICES_LINKS.map((s) => (
              <li key={s}><button onClick={() => setView('services')} className="hover:text-gold transition text-left">{s}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Industries</h4>
          <ul className="space-y-2.5">
            {INDUSTRIES_LINKS.map((i) => (
              <li key={i}><button onClick={() => setView('home')} className="hover:text-gold transition text-left">{i}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              <span>+234 800 123 4567</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <span>12 Aviator Way, Ikeja, Lagos, Nigeria</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 AnCore Marketing. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
