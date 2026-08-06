import { requireAdmin } from './_lib/session.js';
import { getRedis } from './_lib/redis.js';

const VALID_STATUSES = new Set(['open', 'resolved']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return;

  const { id, status, note } = req.body || {};
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ ok: false, error: 'Ticket id is required.' });
  }
  if (status && !VALID_STATUSES.has(status)) {
    return res.status(400).json({ ok: false, error: 'Invalid status.' });
  }

  try {
    const redis = getRedis();
    const raw = await redis.get(`ticket:${id}`);
    if (!raw) {
      return res.status(404).json({ ok: false, error: 'Ticket not found.' });
    }
    const ticket = typeof raw === 'string' ? JSON.parse(raw) : raw;

    if (status) ticket.status = status;
    if (note && typeof note === 'string' && note.trim()) {
      ticket.notes = ticket.notes || [];
      ticket.notes.push({ text: note.trim().slice(0, 2000), at: new Date().toISOString() });
    }
    ticket.updatedAt = new Date().toISOString();

    await redis.set(`ticket:${id}`, JSON.stringify(ticket));
    return res.status(200).json({ ok: true, ticket });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Could not update ticket.' });
  }
}
