// Demo/placeholder case study content. Client names are generic placeholders —
// swap in real client names, real photography, and verified results once available.

const HERO_JET = {
  src: 'https://images.unsplash.com/photo-1759614581731-4c7090648de0?auto=format&fit=crop&w=1400&q=80',
  alt: 'Private jet parked on the tarmac at dusk with golden runway lighting',
};
const WING_VIEW = {
  src: 'https://images.unsplash.com/photo-1698584109673-12d97bc70d08?auto=format&fit=crop&w=1200&q=80',
  alt: 'View of an airplane wing through the cabin window above the clouds',
};
const SUNSET_TAKEOFF = {
  src: 'https://images.unsplash.com/photo-1519012505673-26635fc56af3?auto=format&fit=crop&w=1400&q=80',
  alt: 'Silhouette of an airplane taking off into a golden sunset',
};
const TEAM_PHOTO = {
  src: 'https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?auto=format&fit=crop&w=1200&q=80',
  alt: 'Diverse marketing team collaborating around a laptop in a modern office',
};

export const CASE_STUDIES = {
  mfg: {
    key: 'mfg',
    title: 'Aviation Brand Revamp',
    client: 'Aerospace Component Supplier',
    tags: ['Branding & Identity', 'Website Development', 'Digital Marketing'],
    summary: 'Repositioning a two-decade-old parts supplier around the proof points that actually win Tier-1 contracts.',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80',
      alt: 'Aircraft engine turbine components representing an aviation brand revamp project',
    },
    gallery: [HERO_JET, WING_VIEW],
    challenge:
      'This aircraft component supplier had built a strong reputation with Tier-1 buyers over two decades, but its brand identity and website hadn\u2019t kept pace. Dated visuals undersold a track record that included AS9100 certification and long-running OEM contracts, and procurement teams doing due diligence online weren\u2019t seeing that history reflected back at them.',
    approach: [
      'Repositioned the brand around verifiable proof — certifications, delivery performance, and program history',
      'Designed a new visual identity, including logo, color system, and typography, built for both print and digital use',
      'Built a fast, mobile-responsive website structured around what buyers check during due diligence: capabilities, quality systems, and case histories',
    ],
    results: [
      { value: 38, suffix: '%', label: 'More qualified RFQ inquiries' },
      { value: 2.4, decimals: 1, suffix: 'x', label: 'Longer average time on site' },
      { value: 100, suffix: '%', label: 'Certifications surfaced above the fold' },
    ],
    services: ['Branding & Identity', 'Website Development', 'Digital Marketing'],
    timeline: '10 weeks',
    takeaway: 'A brand refresh grounded in verifiable proof, not just visuals, is what moves procurement teams from "interested" to "qualified."',
  },
  avionics: {
    key: 'avionics',
    title: 'Engineering Co. Website',
    client: 'Civil Engineering Firm',
    tags: ['Website Development', 'SEO & Analytics'],
    summary: 'Rebuilding a slow, hard-to-find website into one that competes for bids instead of losing them by default.',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1759922378222-47ad736a174d?auto=format&fit=crop&w=1400&q=80',
      alt: 'Construction and engineering workers on site reviewing plans',
    },
    gallery: [TEAM_PHOTO],
    challenge:
      'This civil engineering firm was consistently losing bids to competitors who simply looked more credible online. Their existing site was slow, outdated, and effectively invisible in search for the exact services they specialize in.',
    approach: [
      'Rebuilt the site from the ground up on a fast, modern stack',
      'Structured project case studies around the language procurement teams actually search for',
      'Implemented on-page SEO and technical fixes to improve crawlability and load speed',
    ],
    results: [
      { value: 64, suffix: '%', label: 'Faster page load time' },
      { value: 3.1, decimals: 1, suffix: 'x', label: 'Growth in organic search traffic' },
      { value: 21, suffix: '%', label: 'More bid invitations within 6 months' },
    ],
    services: ['Website Development', 'SEO & Analytics'],
    timeline: '6 weeks',
    takeaway: 'Speed and search visibility aren\u2019t just technical details for a firm that competes on bids — they\u2019re the first impression procurement teams form before a proposal is even read.',
  },
  mro: {
    key: 'mro',
    title: 'NGO Awareness Campaign',
    client: 'Community Development Nonprofit',
    tags: ['Social Media Management', 'Content Marketing'],
    summary: 'Turning scattered, inconsistent social messaging into a coordinated campaign that grew trust and donor inquiries.',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
      alt: 'Team collaborating on an NGO awareness campaign',
    },
    gallery: [TEAM_PHOTO],
    challenge:
      'This nonprofit had meaningful impact on the ground, but inconsistent messaging across social channels made it hard for supporters and donors to understand — or trust — the mission at a glance.',
    approach: [
      'Developed a unified content calendar and visual style across every social platform',
      'Produced story-driven content centered on real, specific program outcomes',
      'Ran a coordinated awareness push timed around key giving moments',
    ],
    results: [
      { value: 156, suffix: '%', label: 'Growth in social engagement' },
      { value: 47, suffix: '%', label: 'Increase in donor inquiries' },
      { value: 5, suffix: 'x', label: 'More shares per post on average' },
    ],
    services: ['Social Media Management', 'Content Marketing'],
    timeline: '3-month campaign',
    takeaway: 'Consistency across channels did more for donor trust than any single piece of content — people needed to see the same story told well, everywhere they looked.',
  },
  space: {
    key: 'space',
    title: 'Logistics Company Website',
    client: 'Freight & Logistics Operator',
    tags: ['Website Development', 'SEO & Analytics'],
    summary: 'Giving a phone-and-referral-only logistics operator its first real online front door.',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1754959035256-8e42db4db9aa?auto=format&fit=crop&w=1400&q=80',
      alt: 'Cargo plane on the tarmac representing a logistics company website project',
    },
    gallery: [HERO_JET, WING_VIEW],
    challenge:
      'This freight and logistics operator relied entirely on phone calls and word-of-mouth referrals. There was no way for a prospect to request a quote, check capabilities, or even find the company online.',
    approach: [
      'Designed and built a conversion-focused website with a clear quote-request flow',
      'Built landing pages targeted at high-intent freight and logistics search terms',
      'Set up analytics and lead tracking so the team could see what was actually working',
    ],
    results: [
      { value: 212, suffix: '%', label: 'Increase in online quote requests' },
      { value: 4.2, decimals: 1, suffix: 'x', label: 'More organic search visibility' },
      { value: 18, suffix: '%', label: 'Lower cost per lead' },
    ],
    services: ['Website Development', 'SEO & Analytics'],
    timeline: '8 weeks',
    takeaway: 'A simple, working quote-request flow converted more prospects than any amount of extra content would have — the barrier was friction, not information.',
  },
  tech: {
    key: 'tech',
    title: 'Tech Startup Branding',
    client: 'Early-Stage SaaS Startup',
    tags: ['Branding & Identity'],
    summary: 'Building a complete, consistent identity system before a public launch — from logo to product UI.',
    coverImage: TEAM_PHOTO,
    graphic: true,
    gallery: [],
    challenge:
      'This startup was heading into a public launch with no cohesive identity — inconsistent logos, colors, and messaging across every touchpoint, from the pitch deck to the product itself.',
    approach: [
      'Built a full brand identity system from the ground up: logo, color palette, typography, and voice',
      'Delivered a comprehensive brand guideline document for internal and partner use',
      'Applied the system consistently across pitch decks, social templates, and the product UI',
    ],
    results: [
      { value: 100, suffix: '%', label: 'Consistent identity across every channel' },
      { value: 1, label: 'Brand guideline used company-wide' },
      { value: 30, suffix: '%', label: 'Faster design turnaround post-launch' },
    ],
    services: ['Branding & Identity'],
    timeline: '5 weeks',
    takeaway: 'A brand system built before launch, not patched together after, is what let the team move fast afterward without looking inconsistent while doing it.',
  },
  travel: {
    key: 'travel',
    title: 'Travel Brand Campaign',
    client: 'Travel & Tourism Brand',
    tags: ['Digital Marketing', 'Social Media Management'],
    summary: 'Coordinating paid, organic, and social channels around peak booking season instead of running them separately.',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1762801156780-dec274643407?auto=format&fit=crop&w=1400&q=80',
      alt: 'Modern airport terminal with illuminated blue ceiling design',
    },
    gallery: [SUNSET_TAKEOFF, HERO_JET],
    challenge:
      'This travel brand needed a bigger presence heading into peak booking season but had no coordinated plan across paid, organic, and social channels — each was running independently, with no shared calendar or measurement.',
    approach: [
      'Built a season-long content and paid media calendar timed to booking windows',
      'Ran targeted social campaigns around key destinations and seasonal offers',
      'Tracked bookings back to campaign source to double down on what actually converted',
    ],
    results: [
      { value: 89, suffix: '%', label: 'Increase in booking-season traffic' },
      { value: 2.7, decimals: 1, suffix: 'x', label: 'Return on ad spend' },
      { value: 33, suffix: '%', label: 'More social-driven bookings' },
    ],
    services: ['Digital Marketing', 'Social Media Management'],
    timeline: '4-month campaign',
    takeaway: 'Coordinating channels around the same calendar — instead of running paid, organic, and social as separate efforts — is what let the team double down on what was actually converting.',
  },
};

export const CASE_STUDY_ORDER = ['mfg', 'avionics', 'mro', 'space', 'tech', 'travel'];

export function getCaseStudy(key) {
  return CASE_STUDIES[key] || null;
}

export function getAdjacentCaseStudies(key) {
  const idx = CASE_STUDY_ORDER.indexOf(key);
  if (idx === -1) return { prev: null, next: null };
  const prevKey = CASE_STUDY_ORDER[(idx - 1 + CASE_STUDY_ORDER.length) % CASE_STUDY_ORDER.length];
  const nextKey = CASE_STUDY_ORDER[(idx + 1) % CASE_STUDY_ORDER.length];
  return { prev: CASE_STUDIES[prevKey], next: CASE_STUDIES[nextKey] };
}
