import crypto from 'crypto';

const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured on the server.');
  }
  return secret;
}

export function issueSessionToken() {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const encoded = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', getSecret()).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return false;
  const [encoded, sig] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', getSecret()).update(encoded).digest('base64url');
  const sigBuf = Buffer.from(sig || '');
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function requireAdmin(req, res) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!verifySessionToken(token)) {
    res.status(401).json({ ok: false, error: 'Not authenticated.' });
    return false;
  }
  return true;
}
