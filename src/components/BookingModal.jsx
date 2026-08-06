import { useState } from 'react';

export default function BookingModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', ...form }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onSubmit();
        setForm({ name: '', email: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not reach the server. Please try again shortly.');
    } finally {
      setSubmitting(false);
    }
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
          {error && <p className="text-[11px] text-red-400">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full btn-gold py-3.5 rounded font-semibold text-sm disabled:opacity-60">
            {submitting ? 'Sending…' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}
