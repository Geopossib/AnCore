import { useState } from 'react';
import useReveal from '../../hooks/useReveal';

const SERVICES_OPTIONS = [
  'Digital Marketing',
  'Website Development',
  'Branding & Identity',
  'Social Media Management',
  'SEO & Analytics',
  'Content Marketing',
  'Paid Advertising',
  'Email Marketing',
  'Other',
];

const MAP_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=3.3315%2C6.5818%2C3.3715%2C6.6218&layer=mapnik&marker=6.6018%2C3.3515';

export default function Contact({ setView, showToast }) {
  const heroReveal = useReveal(0);
  const formReveal = useReveal(0);
  const infoReveal = useReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: SERVICES_OPTIONS[0], message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'support',
          name: form.name,
          email: form.email,
          category: form.service,
          message: `${form.message}${form.phone ? `\n\nPhone: ${form.phone}` : ''}`,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        showToast('Message sent — our team will follow up by email shortly.');
        setForm({ name: '', email: '', phone: '', service: SERVICES_OPTIONS[0], message: '' });
      } else {
        showToast(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      showToast('Could not reach the server. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <div ref={heroReveal.ref} className={heroReveal.className} style={heroReveal.style}>
          <h1 className="font-poppins font-bold text-4xl text-[#1D2433] mb-2">Contact Us</h1>
          <p className="text-gray-400 text-xs">
            <button onClick={() => setView('home')} className="hover:text-[#C8922E]">Home</button> / Contact
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div ref={formReveal.ref} className={`lg:col-span-7 ${formReveal.className}`} style={formReveal.style}>
            <h2 className="font-poppins font-semibold text-xl text-[#1D2433] mb-1">Let&apos;s Talk</h2>
            <p className="text-gray-500 text-sm mb-6">Have a project in mind? We&apos;d love to hear from you.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded border border-gray-300 text-sm text-[#1D2433] focus:outline-none focus:border-[#C8922E]"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded border border-gray-300 text-sm text-[#1D2433] focus:outline-none focus:border-[#C8922E]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded border border-gray-300 text-sm text-[#1D2433] focus:outline-none focus:border-[#C8922E]"
              />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded border border-gray-300 text-sm text-[#1D2433] focus:outline-none focus:border-[#C8922E]"
              >
                {SERVICES_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <textarea
                placeholder="Message"
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded border border-gray-300 text-sm text-[#1D2433] focus:outline-none focus:border-[#C8922E]"
              />
              <button type="submit" disabled={submitting} className="btn-gold px-6 py-3.5 rounded font-semibold text-sm disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          </div>

          <div ref={infoReveal.ref} className={`lg:col-span-5 ${infoReveal.className}`} style={infoReveal.style}>
            <h2 className="font-poppins font-semibold text-xl text-[#1D2433] mb-5">Get In Touch</h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8922E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                <span className="text-sm text-gray-600">+234 800 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8922E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" /></svg>
                <span className="text-sm text-gray-600">hello@ancoremarketing.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8922E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="text-sm text-gray-600">12 Aviation Way, Ikeja, Lagos, Nigeria</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#C8922E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" /></svg>
                <span className="text-sm text-gray-600">Monday – Friday<br />9:00 AM – 5:00 PM</span>
              </li>
            </ul>
            <div className="rounded-xl overflow-hidden border border-gray-200 h-56">
              <iframe
                title="AnCore Marketing office location"
                src={MAP_EMBED_URL}
                className="w-full h-full"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
