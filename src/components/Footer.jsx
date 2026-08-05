export default function Footer({ setView }) {
  return (
    <footer className="bg-charcoal text-muted text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>© 2026 AnCore Marketing Agency. All rights reserved.</p>
        <div className="flex gap-6">
          <button onClick={() => setView('support')} className="hover:text-white">Support</button>
          <button onClick={() => setView('admin')} className="hover:text-white">Admin Panel</button>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
