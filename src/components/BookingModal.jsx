export default function BookingModal({ open, onClose, onSubmit }) {
  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="panel glass-modal max-w-md w-full rounded-xl p-8 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-muted hover:text-white text-lg">✕</button>
        <h3 className="font-head text-xl font-bold mb-1">Schedule a Strategy Call</h3>
        <p className="text-xs text-muted mb-5">Complimentary 30-minute growth audit.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required placeholder="Your Name" className="w-full px-4 py-3 rounded text-sm" />
          <input required type="email" placeholder="Work Email" className="w-full px-4 py-3 rounded text-sm" />
          <button type="submit" className="w-full btn-gold py-3.5 rounded font-semibold text-sm">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}
