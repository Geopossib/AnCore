import { useEffect, useRef, useState } from 'react';
import useTyping from '../hooks/useTyping';
import useHeaderScroll from '../hooks/useHeaderScroll';
import MagneticButton from './MagneticButton';
import useReducedMotion from '../hooks/useReducedMotion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About Us' },
  { id: 'insights', label: 'Insights' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ view, setView, onBook }) {
  const brandText = useTyping('AnCore', 110);
  const scrolled = useHeaderScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const logoStrokeRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const path = logoStrokeRef.current;
    if (!path || reducedMotion) return;
    const length = path.getTotalLength();
    path.style.setProperty('--logo-len', length);
    requestAnimationFrame(() => {
      path.classList.add('drawn');
    });
  }, [reducedMotion]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeBtn = nav.querySelector(`[data-navid="${view}"]`);
    if (!activeBtn) {
      setIndicator((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - navRect.left, width: btnRect.width, opacity: 1 });
  }, [view]);

  useEffect(() => {
    function handleResize() {
      const nav = navRef.current;
      if (!nav) return;
      const activeBtn = nav.querySelector(`[data-navid="${view}"]`);
      if (!activeBtn) return;
      const navRect = nav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicator({ left: btnRect.left - navRect.left, width: btnRect.width, opacity: 1 });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  function go(id) {
    setView(id);
    setMobileOpen(false);
  }

  return (
    <header className={`sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-line${scrolled ? ' scrolled' : ''}`} id="siteHeader">
      <div className="header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center space-x-3">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <path
              ref={logoStrokeRef}
              className="logo-draw"
              d="M20 3 L36 34 L20 27 L4 34 Z"
              fill="none"
              stroke="#C9980B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M20 3 L36 34 L20 27 L4 34 Z" fill="#C9980B" opacity={reducedMotion ? 1 : 0.92} />
          </svg>
          <div className="text-left">
            <span className="font-head text-lg font-extrabold tracking-tight leading-none block">
              {brandText}
              <span className="type-cursor blinking">&nbsp;</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">Marketing</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-muted relative" ref={navRef}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              data-navid={item.id}
              onClick={() => go(item.id)}
              className={`px-3 py-2 rounded transition hover:text-white${view === item.id ? ' text-white' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <button
            data-navid="portal"
            onClick={() => go('portal')}
            className="px-3 py-2 rounded border border-line text-gold"
          >
            Client Portal
          </button>
          <span id="navIndicator" style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }} />
        </nav>

        <MagneticButton onClick={onBook} className="hidden md:inline-flex btn-gold px-5 py-2.5 rounded font-semibold text-sm">
          Book a Strategy Call
        </MagneticButton>

        <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-navy px-4 pt-3 pb-5 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className="block w-full text-left px-3 py-2.5 rounded text-muted hover:text-white">
              {item.label}
            </button>
          ))}
          <button onClick={() => go('portal')} className="block w-full text-left px-3 py-2.5 rounded text-gold font-semibold">
            Client Portal
          </button>
          <button
            onClick={() => {
              onBook();
              setMobileOpen(false);
            }}
            className="w-full mt-2 btn-gold py-3 rounded font-semibold text-center"
          >
            Book a Strategy Call
          </button>
        </div>
      )}
    </header>
  );
}
