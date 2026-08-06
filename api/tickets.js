import { requireAdmin } from './_lib/session.js';
import { getRedis } from './_lib/redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return;

  try {
    const redis = getRedis();
    const ids = await redis.zrange('tickets:index', 0, 199, { rev: true });
    if (!ids || ids.length === 0) {
      return res.status(200).json({ ok: true, tickets: [] });
    }
    const raw = await redis.mget(...ids.map((id) => `ticket:${id}`));
    const tickets = raw
      .filter(Boolean)
      .map((t) => (typeof t === 'string' ? JSON.parse(t) : t));
    return res.status(200).json({ ok: true, tickets });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Could not load tickets.' });
  }
}
