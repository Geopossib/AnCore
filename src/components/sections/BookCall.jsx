import SectionHeader from '../SectionHeader';

const DAYS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function BookCall({ setView }) {
  return (
    <section className="view-section py-20">
      <SectionHeader num="09" label="Book a Call" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Book a Strategy Call</h2>
      <p className="text-muted text-sm mb-8 max-w-md">Schedule a 30-minute call with our team to discuss your goals.</p>

      <div className="panel rounded-xl p-8 max-w-md">
        <p className="text-xs font-bold mb-3">May 2026</p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={`h${i}`} className="text-muted">{d}</span>
          ))}
          {DAYS.map((d) => (
            <span key={d} className={`py-1.5 ${d === 15 ? 'rounded-full btn-gold font-bold' : 'text-muted'}`}>{d}</span>
          ))}
        </div>
        <select className="w-full px-4 py-3 rounded text-sm mb-4">
          <option>10:00 AM (GMT+1)</option>
          <option>2:00 PM (GMT+1)</option>
          <option>4:30 PM (GMT+1)</option>
        </select>
        <button onClick={() => setView('payment')} className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Confirm Booking</button>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('newsletter')} className="text-sm font-semibold text-muted">← Newsletter</button>
        <button onClick={() => setView('payment')} className="text-sm font-semibold text-gold">Next: Payment →</button>
      </div>
    </section>
  );
}
