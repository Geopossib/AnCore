import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';
import insightsChartImage from '../../assets/images/insights-future-aerospace-marketing-01.jpg';

const ARTICLES = [
  {
    title: 'The Future of Aerospace Marketing in 2025',
    img: insightsChartImage,
    alt: 'Commercial aircraft in flight overlaid with financial growth charts and market data',
    local: true,
  },
  {
    title: 'How to Generate High-Quality Leads for Aviation Businesses',
    img: 'https://images.unsplash.com/photo-1519074069444-1ba4eaa1674a?auto=format&fit=crop&w=600&q=80',
    alt: 'Aircraft cockpit instrument panel representing lead generation for aviation businesses',
  },
  {
    title: 'Brand Positioning in the Aerospace Industry',
    img: 'https://images.unsplash.com/photo-1518566107615-f7267099eced?auto=format&fit=crop&w=600&q=80',
    alt: 'Close-up of an aircraft cockpit control panel representing brand positioning in aerospace',
  },
];

function ArticleCard({ article, delay, onOpen }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={`panel rounded-xl overflow-hidden cursor-pointer hover-lift ${className}`} style={style} onClick={() => onOpen(article.title)}>
      <img src={article.img} className="w-full h-28 object-cover" alt={article.alt} loading="lazy" />
      <div className="p-4"><h4 className="font-bold text-sm">{article.title}</h4></div>
    </div>
  );
}

export default function Insights({ setView, onOpenBlog }) {
  return (
    <section className="view-section py-20">
      <SectionHeader num="05" label="Insights / Blog" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Insights That Drive Growth</h2>
      <p className="text-muted text-sm mb-10 max-w-lg">Actionable insights for the aerospace &amp; aviation industry.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {ARTICLES.map((a, i) => (
          <ArticleCard key={a.title} article={a} delay={i * 0.1} onOpen={onOpenBlog} />
        ))}
      </div>
      <button onClick={() => setView('contact')} className="text-sm font-semibold text-gold mb-10 block">
        View All Articles →
      </button>

      <div className="flex justify-between">
        <button onClick={() => setView('about')} className="text-sm font-semibold text-muted">← About Us</button>
        <button onClick={() => setView('contact')} className="text-sm font-semibold text-gold">Next: Contact →</button>
      </div>
    </section>
  );
}
