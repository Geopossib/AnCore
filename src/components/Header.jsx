import { useEffect, useRef, useState } from 'react';
import useTyping from '../hooks/useTyping';
import useHeaderScroll from '../hooks/useHeaderScroll';
import MagneticButton from './MagneticButton';
import useReducedMotion from '../hooks/useReducedMotion';
import logoMark from '../assets/images/logo-mark-01.png';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'home', label: 'Industries', key: 'industries' },
  { id: 'insights', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ view, setView, onBook }) {
  const brandText = useTyping('AnCore', 110);
  const scrolled = useHeaderScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const reducedMotion = useReducedMotion();

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
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200${scrolled ? ' scrolled' : ''}`} id="siteHeader">
      <div className="header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center space-x-3">
          <img
            src={logoMark}
            alt="AnCore Marketing logo mark"
            className={`h-9 w-auto${reducedMotion ? '' : ' logo-pop'}`}
          />
          <div className="text-left">
            <span className="font-head text-lg font-extrabold tracking-tight leading-none block text-navy">
              {brandText}
              <span className="type-cursor blinking">&nbsp;</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">Marketing</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-navy/70 relative" ref={navRef}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key || item.id}
              data-navid={item.key || item.id}
              onClick={() => go(item.id)}
              className={`px-3 py-2 rounded transition hover:text-navy${view === (item.key || item.id) ? ' text-navy font-semibold' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <span id="navIndicator" style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }} />
        </nav>

        <MagneticButton onClick={onBook} className="hidden md:inline-flex btn-gold px-5 py-2.5 rounded font-semibold text-sm">
          Book Consultation
        </MagneticButton>

        <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 text-navy">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button key={item.key || item.id} onClick={() => go(item.id)} className="block w-full text-left px-3 py-2.5 rounded text-navy/70 hover:text-navy">
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onBook();
              setMobileOpen(false);
            }}
            className="w-full mt-2 btn-gold py-3 rounded font-semibold text-center"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
}
