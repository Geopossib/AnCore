import { useState } from 'react';
import SectionHeader from '../SectionHeader';

const REPO_URL = 'https://github.com/Geopossib/AnCore';
const CATEGORIES = ['General Question', 'Bug / Something Broken', 'Billing Issue', 'Feature Request'];

function buildIssueUrl({ category, name, email, message }) {
  const title = encodeURIComponent(`[${category}] Request from ${name || 'a visitor'}`);
  const body = encodeURIComponent(
    `**From:** ${name || '—'}\n**Email:** ${email || '—'}\n**Category:** ${category}\n\n---\n\n${message}`
  );
  const label = encodeURIComponent('support-request');
  return `${REPO_URL}/issues/new?title=${title}&body=${body}&labels=${label}`;
}

export default function Support({ setView, showToast }) {
  const [form, setForm] = useState({ name: '', email: '', category: CATEGORIES[0], message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.message.trim()) return;
    const url = buildIssueUrl(form);
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening GitHub to finish submitting your request…');
  }

  return (
    <section className="view-section py-20">
      <SectionHeader num="13" label="Support" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Submit a Request</h2>
      <p className="text-muted text-sm mb-2 max-w-lg">
        Have an issue, a question, or a feature you&apos;d like to see? Send it in and our team will get back to you.
      </p>
      <p className="text-muted text-xs mb-8 max-w-lg">
        Submissions are filed as tickets on our GitHub tracker, so you&apos;ll be prompted to sign in with (or create) a
        free GitHub account to finish sending your request — this keeps every ticket in one transparent, trackable place.
      </p>

      <form onSubmit={handleSubmit} className="panel rounded-xl p-6 space-y-3 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
          <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded text-sm" />
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
        <button type="submit" className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Submit Request</button>
      </form>

      <div className="flex justify-between mt-10 max-w-xl">
        <button onClick={() => setView('faq')} className="text-sm font-semibold text-muted">← FAQ</button>
        <button onClick={() => setView('admin')} className="text-sm font-semibold text-gold">Admin Panel →</button>
      </div>
    </section>
  );
}
