import { useState } from 'react';
import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';
import contactImage from '../../assets/images/contact-touchpoint-interface-01.jpg';

export default function Contact({ setView, showToast }) {
  const formReveal = useReveal(0);
  const imgReveal = useReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    setForm({ name: '', email: '', company: '', message: '' });
    showToast('Message sent — we will be in touch shortly.');
  }

  return (
    <section className="view-section py-20">
      <SectionHeader num="06" label="Contact" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div ref={formReveal.ref} className={`lg:col-span-5 ${formReveal.className}`} style={formReveal.style}>
          <h2 className="font-head text-3xl font-extrabold mb-3">Let&apos;s Build Something Extraordinary</h2>
          <p className="text-muted text-sm mb-8">Tell us about your project and we&apos;ll be in touch.</p>
          <form onSubmit={handleSubmit} className="panel rounded-xl p-6 space-y-3">
            <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
            <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
            <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
            <textarea placeholder="How can we help?" rows="3" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
            <button type="submit" className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Send Message</button>
          </form>
        </div>
        <div ref={imgReveal.ref} className={`lg:col-span-7 ${imgReveal.className}`} style={imgReveal.style}>
          <div className="rounded-xl overflow-hidden panel">
            <img
              src={contactImage}
              className="w-full h-80 object-cover"
              alt="Hand reaching toward a digital aviation interface with travel and technology icons"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('insights')} className="text-sm font-semibold text-muted">← Insights</button>
        <button onClick={() => setView('faq')} className="text-sm font-semibold text-gold">Next: FAQ →</button>
      </div>
    </section>
  );
}
