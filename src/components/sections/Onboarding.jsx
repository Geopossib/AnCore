import SectionHeader from '../SectionHeader';

const CHECKLIST = ['Company Information', 'Project Goals', 'Target Audience', 'Brand Assets', 'Kickoff Call'];

export default function Onboarding({ setView }) {
  return (
    <section className="view-section py-20">
      <SectionHeader num="11" label="Client Onboarding" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Welcome Aboard!</h2>
      <p className="text-muted text-sm mb-8 max-w-md">Let&apos;s get started with some essential information.</p>

      <div className="panel rounded-xl p-8 max-w-md">
        <ul className="space-y-3 mb-6 text-sm font-semibold">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-2 text-gold">
              ✓ <span className="text-white">{item}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => setView('portal')} className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Complete Setup</button>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('payment')} className="text-sm font-semibold text-muted">← Payment</button>
        <button onClick={() => setView('portal')} className="text-sm font-semibold text-gold">Next: Client Portal →</button>
      </div>
    </section>
  );
}
