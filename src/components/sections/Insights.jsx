import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';
import TiltCard from '../TiltCard';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BLOG_IMAGES } from '../../data/blogImages';

function ArticleCard({ post, delay, onOpen }) {
  const { ref, className, style } = useReveal(delay);
  const image = BLOG_IMAGES[post.heroImageKey];
  return (
    <div ref={ref} className={className} style={style}>
      <TiltCard className="panel rounded-xl overflow-hidden cursor-pointer" onClick={() => onOpen(post.slug)}>
        <img src={image.src} className="w-full h-28 object-cover" alt={image.alt} loading="lazy" />
        <div className="p-4">
          <h4 className="font-bold text-sm mb-1">{post.title}</h4>
          <p className="text-[11px] text-muted">{post.readTime}</p>
        </div>
      </TiltCard>
    </div>
  );
}

export default function Insights({ setView, onOpenPost }) {
  return (
    <section className="view-section py-20">
      <SectionHeader num="05" label="Insights / Blog" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Insights That Drive Growth</h2>
      <p className="text-muted text-sm mb-10 max-w-lg">Actionable insights for the aerospace &amp; aviation industry.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {BLOG_POSTS.map((post, i) => (
          <ArticleCard key={post.slug} post={post} delay={i * 0.1} onOpen={onOpenPost} />
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setView('about')} className="text-sm font-semibold text-muted">← About Us</button>
        <button onClick={() => setView('contact')} className="text-sm font-semibold text-gold">Next: Contact →</button>
      </div>
    </section>
  );
}
