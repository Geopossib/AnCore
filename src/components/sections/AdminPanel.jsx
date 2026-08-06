import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../SectionHeader';

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function TicketCard({ ticket, token, onUpdated }) {
  const [noteInput, setNoteInput] = useState('');
  const [busy, setBusy] = useState(false);
  const isOpen = ticket.status === 'open';
  const isBooking = ticket.type === 'booking';

  async function update(patch) {
    setBusy(true);
    try {
      const res = await fetch('/api/ticket-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: ticket.id, ...patch }),
      });
      const data = await res.json();
      if (res.ok && data.ok) onUpdated(data.ticket);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel rounded-xl p-5 hover-lift">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span className={`text-[9px] font-bold uppercase tracking-widest ${isBooking ? 'text-gold' : 'text-white'}`}>
            {isBooking ? 'Booking' : 'Support'}
          </span>
          <h4 className="font-bold text-sm leading-snug">
            {isBooking ? `Strategy call — ${ticket.name}` : ticket.category || 'General Request'}
          </h4>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded flex-shrink-0 ${isOpen ? 'bg-gold text-navy' : 'bg-surface2 text-muted'}`}>
          {ticket.status}
        </span>
      </div>

      <p className="text-xs text-muted mb-2">
        <span className="text-white font-semibold">{ticket.name}</span> · {ticket.email}
      </p>
      {ticket.message && <p className="text-xs text-muted mb-3">{ticket.message}</p>}

      {ticket.notes && ticket.notes.length > 0 && (
        <div className="space-y-1.5 mb-3 border-l-2 border-line pl-3">
          {ticket.notes.map((n, i) => (
            <p key={i} className="text-[11px] text-muted">
              <span className="text-gold font-semibold">Note</span> · {n.text}{' '}
              <span className="opacity-60">({timeAgo(n.at)})</span>
            </p>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-muted mb-3">
        <span>Submitted {timeAgo(ticket.createdAt)}</span>
        <button
          disabled={busy}
          onClick={() => update({ status: isOpen ? 'resolved' : 'open' })}
          className="text-gold font-semibold hover:underline disabled:opacity-50"
        >
          {isOpen ? 'Mark resolved' : 'Reopen'}
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!noteInput.trim()) return;
          update({ note: noteInput }).then(() => setNoteInput(''));
        }}
        className="flex gap-2"
      >
        <input
          placeholder="Add an internal note…"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded text-xs"
        />
        <button type="submit" disabled={busy} className="btn-outline px-3 py-2 rounded text-xs font-semibold disabled:opacity-50">
          Add
        </button>
      </form>
    </div>
  );
}

export default function AdminPanel({ setView }) {
  const [unlocked, setUnlocked] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [authStatus, setAuthStatus] = useState('idle'); // idle | checking | error
  const [authError, setAuthError] = useState('');
  const [token, setToken] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | error | loaded
  const [filter, setFilter] = useState('open');
  const tabsRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!unlocked || !token) return;
    setStatus('loading');
    fetch('/api/tickets', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setTickets(data.tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          setStatus('loaded');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [unlocked, token]);

  function handleTicketUpdated(updated) {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  const filtered = tickets.filter((t) => (filter === 'all' ? true : t.status === filter));
  const openCount = tickets.filter((t) => t.status === 'open').length;

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-tab="${filter}"]`);
    if (!activeBtn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    setPill({ left: btnRect.left - containerRect.left, width: btnRect.width });
  }, [filter, status]);

  if (!unlocked) {
    return (
      <section className="view-section py-20">
        <SectionHeader num="14" label="Admin Panel" />
        <div className="panel rounded-xl p-8 max-w-sm">
          <h2 className="font-head text-xl font-extrabold mb-2">Admin Access</h2>
          <p className="text-muted text-xs mb-4">
            The passcode is checked server-side and never ships in the site&apos;s code, and every request below is
            authenticated with a short-lived session token — not just a local flag.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setAuthStatus('checking');
              setAuthError('');
              try {
                const res = await fetch('/api/admin-auth', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ passcode: passInput }),
                });
                const data = await res.json();
                if (res.ok && data.ok) {
                  setToken(data.token);
                  setUnlocked(true);
                } else {
                  setAuthStatus('error');
                  setAuthError(data.error || 'Incorrect passcode.');
                }
              } catch {
                setAuthStatus('error');
                setAuthError('Could not reach the server. Try again in a moment.');
              }
            }}
            className="space-y-3"
          >
            <input
              type="password"
              placeholder="Passcode"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              className="w-full px-4 py-3 rounded text-sm"
            />
            {authStatus === 'error' && <p className="text-[11px] text-red-400">{authError}</p>}
            <button type="submit" disabled={authStatus === 'checking'} className="w-full btn-gold py-3 rounded font-semibold text-sm disabled:opacity-60">
              {authStatus === 'checking' ? 'Checking…' : 'Enter'}
            </button>
          </form>
        </div>
        <button onClick={() => setView('support')} className="text-sm font-semibold text-muted mt-8 block">← Back to Support</button>
      </section>
    );
  }

  return (
    <section className="view-section py-20">
      <SectionHeader num="14" label="Admin Panel" />
      <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
        <h2 className="font-head text-3xl font-extrabold flex items-center gap-3">
          Tickets &amp; Requests
          {openCount > 0 && (
            <span className="notif-badge inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-gold text-navy text-[11px] font-bold">
              {openCount}
            </span>
          )}
        </h2>
        <span className="text-xs text-muted">{openCount} open · {tickets.length} total</span>
      </div>
      <p className="text-muted text-sm mb-6 max-w-lg">
        Booking requests and support messages submitted through the site, stored on our own server — no GitHub
        account required from visitors. Mark items resolved or leave yourself a note right here.
      </p>

      <div ref={tabsRef} className="relative inline-flex gap-1 mb-6 p-1 panel rounded">
        <div className="pill-indicator rounded" style={{ left: pill.left, width: pill.width }} />
        {['open', 'resolved', 'all'].map((f) => (
          <button
            key={f}
            data-tab={f}
            onClick={() => setFilter(f)}
            className={`relative z-10 px-4 py-2 rounded text-xs font-semibold capitalize transition-colors ${
              filter === f ? 'text-navy' : 'text-muted hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton rounded-xl h-24" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="panel rounded-xl p-6 text-sm text-muted">
          Couldn&apos;t load tickets right now. If this is a fresh deploy, make sure a Redis integration is connected
          in the Vercel dashboard (Settings → Integrations) and <code className="text-gold">ADMIN_SESSION_SECRET</code>{' '}
          is set as an environment variable.
        </div>
      )}

      {status === 'loaded' && filtered.length === 0 && (
        <div className="panel rounded-xl p-6 text-sm text-muted">No {filter === 'all' ? '' : filter} tickets yet.</div>
      )}

      {status === 'loaded' && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} token={token} onUpdated={handleTicketUpdated} />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('support')} className="text-sm font-semibold text-muted">← Support</button>
        <button onClick={() => setView('home')} className="text-sm font-semibold text-gold">Back to Homepage →</button>
      </div>
    </section>
  );
}
