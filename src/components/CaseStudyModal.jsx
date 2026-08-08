const CASE_STUDIES = {
  mfg: {
    title: 'Aviation Brand Revamp',
    challenge: 'An aircraft component supplier had a dated brand that undersold its actual track record with Tier-1 buyers.',
    solution: 'A full brand refresh plus a new site built around verifiable proof — certifications, delivery data, and program history.',
  },
  avionics: {
    title: 'Engineering Co. Website',
    challenge: 'A civil engineering firm was losing bids to competitors with a stronger digital presence.',
    solution: 'A fast, SEO-optimized website with project case studies that speak directly to procurement teams.',
  },
  mro: {
    title: 'NGO Awareness Campaign',
    challenge: 'Low awareness and inconsistent messaging across social channels for a growing nonprofit.',
    solution: 'A unified content and social media campaign that grew engagement and donor inquiries.',
  },
  space: {
    title: 'Logistics Company Website',
    challenge: 'A freight and logistics operator had no way for prospects to request quotes online.',
    solution: 'A conversion-focused website with SEO built around high-intent logistics search terms.',
  },
  tech: {
    title: 'Tech Startup Branding',
    challenge: 'A new startup needed a complete identity system before their public launch.',
    solution: 'Full branding, logo system, and brand guidelines built for consistency across every channel.',
  },
  travel: {
    title: 'Travel Brand Campaign',
    challenge: 'A travel brand needed a bigger presence during peak booking season.',
    solution: 'A coordinated digital marketing and social media campaign timed to seasonal demand.',
  },
};

export default function CaseStudyModal({ open, type, onClose, onBook }) {
  if (!open) return null;
  const study = CASE_STUDIES[type] || { title: 'Case Study', challenge: '', solution: '' };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-[#1D2433] text-lg">✕</button>
        <h3 className="font-poppins font-bold text-xl text-[#1D2433] mb-4">{study.title}</h3>
        <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
          <p className="p-3 rounded bg-[#F5F7FA]">
            <strong className="text-[#1D2433] block mb-1">The Challenge:</strong>
            {study.challenge}
          </p>
          <p className="p-3 rounded bg-[#F5F7FA]">
            <strong className="text-[#C8922E] block mb-1">Our Solution:</strong>
            {study.solution}
          </p>
        </div>
        <button onClick={onBook} className="w-full mt-5 btn-gold py-3 rounded font-semibold text-xs">
          Replicate These Results
        </button>
      </div>
    </div>
  );
}
