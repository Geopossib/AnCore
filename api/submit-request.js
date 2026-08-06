import crypto from 'crypto';
import { getRedis } from './_lib/redis.js';

const VALID_TYPES = new Set(['support', 'booking']);
const MAX_MESSAGE_LEN = 4000;

function clean(str, max = 300) {
  return typeof str === 'string' ? str.trim().slice(0, max) : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { type, name, email, category, message } = req.body || {};

  if (!VALID_TYPES.has(type)) {
    return res.status(400).json({ ok: false, error: 'Invalid request type.' });
  }
  const cleanEmail = clean(email, 200);
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return res.status(400).json({ ok: false, error: 'A valid email is required.' });
  }
  const cleanMessage = clean(message, MAX_MESSAGE_LEN);
  if (type === 'support' && !cleanMessage) {
    return res.status(400).json({ ok: false, error: 'Please describe your request.' });
  }

  const ticket = {
    id: crypto.randomUUID(),
    type,
    name: clean(name, 120) || 'Not provided',
    email: cleanEmail,
    category: clean(category, 80),
    message: cleanMessage,
    status: 'open',
    notes: [],
    createdAt: new Date().toISOString(),
  };

  try {
    const redis = getRedis();
    await redis.set(`ticket:${ticket.id}`, JSON.stringify(ticket));
    await redis.zadd('tickets:index', { score: Date.now(), member: ticket.id });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Could not save your request. Please try again shortly.' });
  }

  return res.status(200).json({ ok: true, id: ticket.id });
}
