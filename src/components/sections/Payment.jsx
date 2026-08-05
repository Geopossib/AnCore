import { useState } from 'react';
import SectionHeader from '../SectionHeader';
import SecureBadge from '../SecureBadge';

const METHODS = ['Credit / Debit Card', 'Bank Transfer', 'PayPal'];

export default function Payment({ setView }) {
  const [selected, setSelected] = useState(METHODS[0]);

  return (
    <section className="view-section py-20">
      <SectionHeader num="10" label="Payment" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Secure Payment</h2>
      <p className="text-muted text-sm mb-8 max-w-md">Choose your preferred payment method to confirm your booking.</p>

      <div className="panel rounded-xl p-8 max-w-md space-y-3">
        {METHODS.map((m) => (
          <label key={m} className="flex items-center gap-3 p-3.5 rounded border border-line cursor-pointer" style={selected === m ? { borderColor: '#C9980B' } : undefined}>
            <input type="radio" name="pay" checked={selected === m} onChange={() => setSelected(m)} className="accent-[#C9980B]" />
            <span className="text-sm font-semibold">{m}</span>
          </label>
        ))}
        <div className="pt-2"><SecureBadge /></div>
        <button onClick={() => setView('onboarding')} className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Pay Securely</button>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('bookcall')} className="text-sm font-semibold text-muted">← Book a Call</button>
        <button onClick={() => setView('onboarding')} className="text-sm font-semibold text-gold">Next: Client Onboarding →</button>
      </div>
    </section>
  );
}
