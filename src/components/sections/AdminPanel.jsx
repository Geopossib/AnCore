import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../SectionHeader';

const REPO_API = 'https://api.github.com/repos/Geopossib/AnCore';
const ADMIN_PASSCODE = 'ancore-admin'; // UI convenience only — see note below, not real security.

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function TicketCard({ issue }) {
  const isOpen = issue.state === 'open';
  return (
    <div className="panel rounded-xl p-5 hover-lift">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-bold text-sm leading-snug">{issue.title}</h4>
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded flex-shrink-0 ${isOpen ? 'bg-gold text-navy' : 'bg-surface2 text-muted'}`}>
          {issue.state}
        </span>
      </div>
      <p className="text-xs text-muted mb-3 line-clamp-3" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {issue.body ? issue.body.replace(/\*\*/g, '').slice(0, 220) : 'No description provided.'}
      </p>
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>#{issue.number} · opened by {issue.user?.login} · {timeAgo(issue.created_at)} · {issue.comments} repl{issue.comments === 1 ? 'y' : 'ies'}</span>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-gold font-semibold hover:underline">
          Respond on GitHub →
        </a>
      </div>
    </div>
  );
}

export default function AdminPanel({ setView }) {
  const [unlocked, setUnlocked] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | error | loaded
  const [filter, setFilter] = useState('open');
  const tabsRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!unlocked) return;
    setStatus('loading');
    fetch(`${REPO_API}/issues?state=all&labels=support-request&per_page=50`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API request failed');
        return res.json();
      })
      .then((data) => {
        setIssues(Array.isArray(data) ? data : []);
        setStatus('loaded');
      })
      .catch(() => setStatus('error'));
  }, [unlocked]);

  const filtered = issues.filter((i) => (filter === 'all' ? true : i.state === filter));
  const openCount = issues.filter((i) => i.state === 'open').length;

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
            This gate is a UI convenience only — the ticket data underneath is public GitHub issue data, not secured
            by this passcode. Don&apos;t rely on it to protect anything sensitive.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passInput === ADMIN_PASSCODE) setUnlocked(true);
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
            <button type="submit" className="w-full btn-gold py-3 rounded font-semibold text-sm">Enter</button>
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
          Support Tickets
          {openCount > 0 && (
            <span className="notif-badge inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-gold text-navy text-[11px] font-bold">
              {openCount}
            </span>
          )}
        </h2>
        <span className="text-xs text-muted">{openCount} open · {issues.length} total</span>
      </div>
      <p className="text-muted text-sm mb-6 max-w-lg">
        Live tickets filed through the Support form, pulled directly from the GitHub Issues tracker. Reply, label, or
        close them straight on GitHub — this panel is a fast read-only view for triage.
      </p>

      <div ref={tabsRef} className="relative inline-flex gap-1 mb-6 p-1 panel rounded">
        <div className="pill-indicator rounded" style={{ left: pill.left, width: pill.width }} />
        {['open', 'closed', 'all'].map((f) => (
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
          Couldn&apos;t reach the GitHub API right now (this can happen if you&apos;re rate-limited — unauthenticated
          requests are capped at 60/hour per IP). Try again shortly, or view tickets directly on{' '}
          <a href={`https://github.com/Geopossib/AnCore/issues`} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            GitHub
          </a>.
        </div>
      )}

      {status === 'loaded' && filtered.length === 0 && (
        <div className="panel rounded-xl p-6 text-sm text-muted">No {filter === 'all' ? '' : filter} tickets yet.</div>
      )}

      {status === 'loaded' && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((issue) => (
            <TicketCard key={issue.id} issue={issue} />
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
