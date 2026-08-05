import { useState } from 'react';
import SectionHeader from '../SectionHeader';

export default function Newsletter({ setView, showToast }) {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setEmail('');
    showToast('Subscribed to the AnCore Aerospace Briefing.');
  }

  return (
    <section className="view-section py-20">
      <SectionHeader num="08" label="Newsletter" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-4xl">
        <div className="lg:col-span-7">
          <h2 className="font-head text-3xl font-extrabold mb-3">Stay Ahead of the Curve</h2>
          <p className="text-muted text-sm mb-6">Get the latest aerospace marketing insights and industry updates.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input required type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3.5 rounded text-sm" />
            <button type="submit" className="btn-gold px-6 py-3.5 rounded font-semibold text-sm">Subscribe</button>
          </form>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-xl overflow-hidden panel">
            <img
              src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&w=800&q=80"
              className="w-full h-48 object-cover"
              alt="Satellite in orbit above Earth, representing the AnCore aerospace marketing newsletter"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <button onClick={() => setView('faq')} className="text-sm font-semibold text-muted">← FAQ</button>
        <button onClick={() => setView('bookcall')} className="text-sm font-semibold text-gold">Next: Book a Call →</button>
      </div>
    </section>
  );
}
