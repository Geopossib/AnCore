import { useState } from 'react';
import SweepWipe from './components/SweepWipe';
import useReducedMotion from './hooks/useReducedMotion';
import Header from './components/Header';
import FeatureBar from './components/FeatureBar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ToastContainer from './components/ToastContainer';
import useToast from './hooks/useToast';

import Home from './components/sections/Home';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import CaseStudy from './components/sections/CaseStudy';
import About from './components/sections/About';
import Insights from './components/sections/Insights';
import Contact from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import Newsletter from './components/sections/Newsletter';
import BookCall from './components/sections/BookCall';
import Payment from './components/sections/Payment';
import Onboarding from './components/sections/Onboarding';
import Portal from './components/sections/Portal';
import Support from './components/sections/Support';
import AdminPanel from './components/sections/AdminPanel';
import BlogPost from './components/sections/BlogPost';

export default function App() {
  const [view, setViewState] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const reducedMotion = useReducedMotion();
  const { toasts, showToast } = useToast();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activePostSlug, setActivePostSlug] = useState(null);
  const [portfolioFilter, setPortfolioFilter] = useState('All');

  function setView(next) {
    if (next === view) return;
    setTransitioning(true);
    if (!reducedMotion) setSweeping(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setViewState(next);
      setTransitioning(false);
    }, 180);
    setTimeout(() => setSweeping(false), 600);
  }

  function openBooking() {
    setBookingOpen(true);
  }
  function closeBooking() {
    setBookingOpen(false);
  }
  function handleBookingSubmit() {
    showToast('Booking request received — our team will follow up by email shortly.');
    setBookingOpen(false);
  }

  function openCaseStudy(key) {
    setActiveCaseStudy(key);
    setView('case-study');
  }

  function openPost(slug) {
    setActivePostSlug(slug);
    setView('blog-post');
  }

  function goToPortfolio(filter) {
    setPortfolioFilter(filter || 'All');
    setView('portfolio');
  }

  const sectionClass = `view-section${transitioning ? ' view-leaving' : ''}`;

  return (
    <>
      <SweepWipe active={sweeping} />
      <Header view={view} setView={setView} onBook={openBooking} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={sectionClass}>
          {view === 'home' && <Home setView={setView} onBook={openBooking} onGoToPortfolio={goToPortfolio} onOpenCase={openCaseStudy} />}
          {view === 'services' && <Services setView={setView} onGoToPortfolio={goToPortfolio} />}
          {view === 'portfolio' && <Portfolio setView={setView} onOpenCase={openCaseStudy} initialFilter={portfolioFilter} />}
          {view === 'case-study' && <CaseStudy projectKey={activeCaseStudy} setView={setView} onBook={openBooking} onOpenCase={openCaseStudy} />}
          {view === 'about' && <About setView={setView} />}
          {view === 'insights' && <Insights setView={setView} onOpenPost={openPost} />}
          {view === 'blog-post' && <BlogPost slug={activePostSlug} setView={setView} onOpenPost={openPost} />}
          {view === 'contact' && <Contact setView={setView} showToast={showToast} />}
          {view === 'faq' && <FAQ setView={setView} />}
          {view === 'newsletter' && <Newsletter setView={setView} showToast={showToast} />}
          {view === 'bookcall' && <BookCall setView={setView} />}
          {view === 'payment' && <Payment setView={setView} />}
          {view === 'onboarding' && <Onboarding setView={setView} />}
          {view === 'portal' && <Portal setView={setView} />}
          {view === 'support' && <Support setView={setView} showToast={showToast} />}
          {view === 'admin' && <AdminPanel setView={setView} />}
        </div>
      </main>

      <FeatureBar />
      <Footer setView={setView} />

      <BookingModal open={bookingOpen} onClose={closeBooking} onSubmit={handleBookingSubmit} />
      <ToastContainer toasts={toasts} />
    </>
  );
}
