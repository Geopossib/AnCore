import { useState } from 'react';
import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';

const FAQS = [
  { q: 'What industries do you work with?', a: 'Aerospace manufacturing, avionics, MRO, defense, and space systems companies.' },
  { q: 'How do you generate leads?', a: 'Through technical SEO, ABM campaigns, and targeted content built for long sales cycles.' },
  { q: 'What is your onboarding process?', a: 'A short setup covering company information, goals, and a kickoff call.' },
  { q: 'How long does it take to see results?', a: 'Most clients see measurable movement in qualified pipeline within 90 days.' },
];

function FaqItem({ item, delay }) {
  const [open, setOpen] = useState(false);
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={`panel rounded-lg ${className}`} style={style}>
      <button className="w-full text-left px-5 py-4 text-sm font-semibold flex justify-between items-center" onClick={() => setOpen((v) => !v)}>
        {item.q} <span className="text-gold">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-5 pb-4 text-xs text-muted">{item.a}</div>}
    </div>
  );
}

export default function FAQ({ setView }) {
  return (
    <section className="view-section py-20">
      <SectionHeader num="07" label="FAQ" />
      <h2 className="font-head text-3xl font-extrabold mb-8">Frequently Asked Questions</h2>

      <div className="max-w-2xl space-y-3 mb-10">
        {FAQS.map((item, i) => (
          <FaqItem key={item.q} item={item} delay={i * 0.08} />
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setView('contact')} className="text-sm font-semibold text-muted">← Contact</button>
        <button onClick={() => setView('newsletter')} className="text-sm font-semibold text-gold">Next: Newsletter →</button>
      </div>
    </section>
  );
}
