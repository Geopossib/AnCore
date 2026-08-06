import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const CATEGORIES = ['General Question', 'Bug / Something Broken', 'Billing Issue', 'Feature Request'];

export default function Support({ setView, showToast }) {
  const [form, setForm] = useState({ name: '', email: '', category: CATEGORIES[0], message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'support', ...form }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        showToast('Request received — our team will follow up by email.');
        setForm({ name: '', email: '', category: CATEGORIES[0], message: '' });
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
    <section className="view-section py-20">
      <SectionHeader num="13" label="Support" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Submit a Request</h2>
      <p className="text-muted text-sm mb-8 max-w-lg">
        Have an issue, a question, or a feature you&apos;d like to see? Send it in and our team will get back to you
        by email — no account needed.
      </p>

      <form onSubmit={handleSubmit} className="panel rounded-xl p-6 space-y-3 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
          <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
        </div>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded text-sm">
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <textarea
          required
          placeholder="Describe your issue or request…"
          rows="5"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded text-sm"
        />
        <button type="submit" disabled={submitting} className="w-full btn-gold py-3.5 rounded font-semibold text-sm disabled:opacity-60">
          {submitting ? 'Sending…' : 'Submit Request'}
        </button>
      </form>

      <div className="flex justify-between mt-10 max-w-xl">
        <button onClick={() => setView('faq')} className="text-sm font-semibold text-muted">← FAQ</button>
        <button onClick={() => setView('admin')} className="text-sm font-semibold text-gold">Admin Panel →</button>
      </div>
    </section>
  );
}
