// Vercel serverless function — runs server-side only.
// The real passcode lives in the ADMIN_PASSCODE environment variable
// (set in Vercel project settings, never committed to the repo), so it
// never ships inside the client JS bundle. On success, issues a short-lived
// signed session token the client uses to authenticate to /api/tickets.
import crypto from 'crypto';
import { issueSessionToken } from './_lib/session.js';

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) {
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    return res.status(500).json({ ok: false, error: 'Admin passcode is not configured on the server.' });
  }

  const { passcode } = req.body || {};
  if (!passcode || typeof passcode !== 'string') {
    return res.status(400).json({ ok: false, error: 'Passcode is required.' });
  }

  if (!timingSafeEqual(passcode, expected)) {
    return res.status(401).json({ ok: false, error: 'Incorrect passcode.' });
  }

  try {
    const token = issueSessionToken();
    return res.status(200).json({ ok: true, token });
  } catch {
    return res.status(500).json({ ok: false, error: 'Session signing is not configured on the server.' });
  }
}
