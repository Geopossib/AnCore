import useReveal from '../../hooks/useReveal';
import { BLOG_POSTS, getPostBySlug } from '../../data/blogPosts';
import { BLOG_IMAGES } from '../../data/blogImages';

function Section({ section, delay }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={className} style={style}>
      <h2 className="font-head text-xl font-bold mb-3 mt-10">{section.heading}</h2>
      {section.paragraphs.map((p, i) => (
        <p key={i} className="text-muted text-sm leading-relaxed mb-4">{p}</p>
      ))}
    </div>
  );
}

export default function BlogPost({ slug, setView, onOpenPost }) {
  const post = getPostBySlug(slug);
  const heroReveal = useReveal(0);

  if (!post) {
    return (
      <section className="view-section py-20">
        <p className="text-muted text-sm">That article couldn&apos;t be found.</p>
        <button onClick={() => setView('insights')} className="text-sm font-semibold text-gold mt-4 block">← Back to Insights</button>
      </section>
    );
  }

  const image = BLOG_IMAGES[post.heroImageKey];
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const nextPost = BLOG_POSTS[(currentIndex + 1) % BLOG_POSTS.length];
  const midpoint = Math.ceil(post.sections.length / 2);

  return (
    <section className="view-section py-20 max-w-3xl mx-auto">
      <button onClick={() => setView('insights')} className="text-sm font-semibold text-muted mb-6 block">← Back to Insights</button>

      <div ref={heroReveal.ref} className={heroReveal.className} style={heroReveal.style}>
        <div className="rounded-xl overflow-hidden panel mb-6">
          <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" loading="lazy" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">Insights / Blog</span>
        <h1 className="font-head text-3xl sm:text-4xl font-extrabold leading-tight mb-3">{post.title}</h1>
        <p className="text-muted text-base mb-4">{post.dek}</p>
        <div className="flex items-center gap-3 text-xs text-muted border-b border-line pb-6 mb-2">
          <div className="w-7 h-7 rounded-full bg-gold text-navy flex items-center justify-center font-bold text-[10px]">AN</div>
          <span className="text-white font-semibold">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <article>
        {post.sections.slice(0, midpoint).map((s, i) => (
          <Section key={s.heading} section={s} delay={i * 0.05} />
        ))}

        {post.pullQuote && (
          <blockquote className="my-8 border-l-4 border-gold pl-5 py-1">
            <p className="font-head text-xl font-bold leading-snug text-white">&ldquo;{post.pullQuote}&rdquo;</p>
          </blockquote>
        )}

        {post.sections.slice(midpoint).map((s, i) => (
          <Section key={s.heading} section={s} delay={i * 0.05} />
        ))}
      </article>

      <div className="panel rounded-xl p-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">Ready to put this into practice for your brand?</p>
        <button onClick={() => setView('bookcall')} className="btn-gold px-6 py-3 rounded font-semibold text-sm whitespace-nowrap">
          Book a Strategy Call
        </button>
      </div>

      <button
        onClick={() => onOpenPost(nextPost.slug)}
        className="w-full text-left panel rounded-xl p-5 mt-6 hover-lift flex items-center justify-between gap-4"
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold block mb-1">Next Article</span>
          <span className="font-bold text-sm">{nextPost.title}</span>
        </div>
        <span className="text-gold text-lg flex-shrink-0">→</span>
      </button>
    </section>
  );
}
