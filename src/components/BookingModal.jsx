import { useState } from 'react';

const REPO_URL = 'https://github.com/Geopossib/AnCore';

function buildBookingIssueUrl({ name, email }) {
  const title = encodeURIComponent(`[Strategy Call] Booking request from ${name}`);
  const body = encodeURIComponent(
    `**Name:** ${name}\n**Email:** ${email}\n\n---\n\nRequesting a complimentary 30-minute strategy call / growth audit.`
  );
  const label = encodeURIComponent('booking-request');
  return `${REPO_URL}/issues/new?title=${title}&body=${body}&labels=${label}`;
}

export default function BookingModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '' });

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const url = buildBookingIssueUrl(form);
    window.open(url, '_blank', 'noopener,noreferrer');
    onSubmit();
    setForm({ name: '', email: '' });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="panel glass-modal max-w-md w-full rounded-xl p-8 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-muted hover:text-white text-lg">✕</button>
        <h3 className="font-head text-xl font-bold mb-1">Schedule a Strategy Call</h3>
        <p className="text-xs text-muted mb-5">Complimentary 30-minute growth audit.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded text-sm"
          />
          <input
            required
            type="email"
            placeholder="Work Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded text-sm"
          />
          <button type="submit" className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Confirm Booking</button>
          <p className="text-[10px] text-muted text-center pt-1">
            You&apos;ll be prompted to finish this on GitHub — that&apos;s what actually files and confirms the request.
          </p>
        </form>
      </div>
    </div>
  );
}
