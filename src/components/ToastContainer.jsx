export default function ToastContainer({ toasts }) {
  return (
    <div id="toastContainer">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.leaving ? 'toast-out' : 'toast-in'}`}>
          <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
