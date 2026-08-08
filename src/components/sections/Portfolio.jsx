import { useState } from 'react';
import useReveal from '../../hooks/useReveal';
import TiltCard from '../TiltCard';
import CaseStudyModal from '../CaseStudyModal';

const FILTERS = ['All', 'Branding', 'Websites', 'Digital Marketing', 'Social Media', 'SEO'];

const PROJECTS = [
  {
    key: 'mfg',
    title: 'Aviation Brand Revamp',
    tags: ['Branding', 'Websites', 'Digital Marketing'],
    tagsLabel: 'Branding, Website, Digital Marketing',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
    alt: 'Aircraft engine turbine components representing an aviation brand revamp project',
    graphic: false,
  },
  {
    key: 'avionics',
    title: 'Engineering Co. Website',
    tags: ['Websites', 'SEO'],
    tagsLabel: 'Website Development, SEO',
    img: 'https://images.unsplash.com/photo-1759922378222-47ad736a174d?auto=format&fit=crop&w=600&q=80',
    alt: 'Construction and engineering workers on site reviewing plans',
    graphic: false,
  },
  {
    key: 'mro',
    title: 'NGO Awareness Campaign',
    tags: ['Social Media', 'Digital Marketing'],
    tagsLabel: 'Social Media, Content Marketing',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    alt: 'Team collaborating on an NGO awareness campaign',
    graphic: false,
  },
  {
    key: 'space',
    title: 'Logistics Company Website',
    tags: ['Websites', 'SEO'],
    tagsLabel: 'Website Development, SEO',
    img: 'https://images.unsplash.com/photo-1754959035256-8e42db4db9aa?auto=format&fit=crop&w=600&q=80',
    alt: 'Cargo plane on the tarmac representing a logistics company website project',
    graphic: false,
  },
  {
    key: 'tech',
    title: 'Tech Startup Branding',
    tags: ['Branding'],
    tagsLabel: 'Branding, Logo, Guidelines',
    graphic: true,
  },
  {
    key: 'travel',
    title: 'Travel Brand Campaign',
    tags: ['Digital Marketing', 'Social Media'],
    tagsLabel: 'Digital Marketing, Social Media',
    img: 'https://images.unsplash.com/photo-1762801156780-dec274643407?auto=format&fit=crop&w=600&q=80',
    alt: 'Modern airport terminal with illuminated blue ceiling design',
    graphic: false,
  },
];

function ProjectCard({ project, delay, onOpen }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={className} style={style}>
      <TiltCard className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer" onClick={() => onOpen(project.key)}>
        {project.graphic ? (
          <div className="w-full h-40 flex items-center justify-center" style={{ background: '#071C44' }}>
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: 'conic-gradient(from 180deg, #C8922E, #ef4444, #6366f1, #C8922E)',
                filter: 'blur(1px)',
              }}
            />
          </div>
        ) : (
          <img src={project.img} alt={project.alt} className="w-full h-40 object-cover" loading="lazy" />
        )}
        <div className="p-4">
          <h4 className="font-poppins font-semibold text-[#1D2433] text-sm mb-1">{project.title}</h4>
          <p className="text-[11px] text-gray-500">{project.tagsLabel}</p>
        </div>
      </TiltCard>
    </div>
  );
}

export default function Portfolio({ setView, onBook }) {
  const [filter, setFilter] = useState('All');
  const [caseStudy, setCaseStudy] = useState(null);
  const heroReveal = useReveal(0);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <div ref={heroReveal.ref} className={heroReveal.className} style={heroReveal.style}>
          <h1 className="font-poppins font-bold text-4xl text-[#1D2433] mb-2">Our Portfolio</h1>
          <p className="text-gray-400 text-xs">
            <button onClick={() => setView('home')} className="hover:text-[#C8922E]">Home</button> / Portfolio
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                filter === f ? 'bg-[#C8922E] border-[#C8922E] text-white' : 'border-gray-300 text-gray-600 hover:border-[#C8922E]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filtered.map((p, i) => (
            <ProjectCard key={p.key} project={p} delay={(i % 3) * 0.08} onOpen={setCaseStudy} />
          ))}
        </div>

        <div className="text-center">
          <button className="btn-gold px-6 py-3 rounded font-semibold text-sm">Load More Projects</button>
        </div>
      </section>

      <CaseStudyModal open={!!caseStudy} type={caseStudy} onClose={() => setCaseStudy(null)} onBook={() => { setCaseStudy(null); onBook(); }} />
    </div>
  );
}
