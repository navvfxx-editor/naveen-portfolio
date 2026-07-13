// This is the content the site shows the very first time — before the owner
// has connected the backend API / added anything through the Admin Panel. Everything
// here mirrors the shape of the Firestore documents, so once the owner edits
// something in /admin, the live Firestore data simply overrides these values.

export const defaultSettings = {
  siteName: 'NAVEEN',
  tagline: 'Cinematic Video Editor',
  logoUrl: '',
  faviconUrl: '',
  footerText: '© ' + new Date().getFullYear() + ' Naveen. All rights reserved.',
  themeAccent: '#8B14E1',
}

export const defaultContact = {
  ownerName: 'Naveen',
  phone: '+91 8824096308',
  whatsappNumber: '918824096308', // digits only, country code first — used for wa.me links
  email: 'navv.fxx@gmail.com',
  instagramUrl: 'https://www.instagram.com/navv.fx',
  instagramHandle: '@navv.fx',
  youtubeUrl: '',
  linkedinUrl: '',
  address: '',
  mapEmbedUrl: '',
}

export const defaultHero = {
  title: 'NAVEEN',
  subtitle: 'CINEMATIC VIDEO EDITOR',
  description:
    'I turn raw footage into films that hold attention — weddings, YouTube, reels and commercials, cut and graded in DaVinci Resolve & After Effects.',
  bgVideoUrl: '',
  primaryBtnText: 'Hire Me',
  secondaryBtnText: 'Watch Showreel',
  stats: [
    { label: 'Projects', value: '150+' },
    { label: 'Happy Clients', value: '50+' },
    { label: 'Years Experience', value: '6+' },
    { label: 'Video Views', value: '100M+' },
  ],
}

export const defaultAbout = {
  photoUrl: '',
  story:
    "I'm Naveen, a cinematic video editor with 6+ years of experience shaping raw footage into stories worth watching. My craft lives in DaVinci Resolve for colour and pace, and After Effects for motion — from wedding films to YouTube content and commercial ads.",
  mission:
    'To give every client a final cut that feels inevitable — nothing wasted, every frame earning its place.',
  resumeUrl: '',
  timeline: [
    { year: '2019', title: 'First Cut', description: 'Started editing wedding highlight films.' },
    { year: '2021', title: 'Going Digital', description: 'Specialised in YouTube & Instagram content.' },
    { year: '2023', title: 'Commercial Work', description: 'Began cutting ads & corporate videos.' },
    { year: '2026', title: 'Full-Time Studio', description: '150+ projects delivered across genres.' },
  ],
  skills: [
    { name: 'DaVinci Resolve', level: 95 },
    { name: 'After Effects', level: 90 },
    { name: 'Colour Grading', level: 92 },
    { name: 'Motion Graphics', level: 85 },
    { name: 'Sound Design', level: 78 },
  ],
}

export const defaultServices = [
  { id: '1', name: 'Video Editing', icon: 'FaFilm', description: 'Precise, story-first edits for any format.' },
  { id: '2', name: 'Wedding Editing', icon: 'FaHeart', description: 'Cinematic wedding films that hold emotion.' },
  { id: '3', name: 'YouTube Editing', icon: 'FaYoutube', description: 'Retention-first cuts built for watch time.' },
  { id: '4', name: 'Instagram Reels', icon: 'FaInstagram', description: 'Fast, scroll-stopping vertical edits.' },
  { id: '5', name: 'Motion Graphics', icon: 'FaShapes', description: 'Titles, lower-thirds & animated logos.' },
  { id: '6', name: 'Colour Grading', icon: 'FaPalette', description: 'Mood-driven grades in DaVinci Resolve.' },
  { id: '7', name: 'Commercial Ads', icon: 'FaBullhorn', description: 'Punchy edits built to sell in seconds.' },
  { id: '8', name: 'Corporate Videos', icon: 'FaBriefcase', description: 'Clean, professional brand storytelling.' },
  { id: '9', name: 'Podcast Editing', icon: 'FaMicrophone', description: 'Tight audio-video cuts, ready to publish.' },
  { id: '10', name: 'Thumbnail Design', icon: 'FaImage', description: 'High-CTR thumbnails that match the cut.' },
]

export const CATEGORIES = ['All', 'Wedding', 'Commercial', 'YouTube', 'Gaming', 'Travel', 'Real Estate', 'Music', 'Corporate']

// type: 'shorts' | 'long' — powers the Shorts / Long Videos toggle on Portfolio & Contact.
export const defaultPortfolio = [
  { id: 'p1', title: 'Monsoon Wedding Film', category: 'Wedding', type: 'long', youtubeId: 'aqz-KE-bpKQ' },
  { id: 'p2', title: 'Product Launch Reel', category: 'Commercial', type: 'shorts', youtubeId: 'dQw4w9WgXcQ' },
]

export const defaultTestimonials = [
  { id: 't1', name: 'Rohit Sharma', company: 'Sharma Films', rating: 5, review: 'Naveen turned our raw wedding footage into something truly cinematic. Outstanding pacing and colour work.', image: '' },
  { id: 't2', name: 'Ayesha Khan', company: 'Khan Studios', rating: 5, review: 'Fast turnaround, sharp storytelling instincts, and the grading always nails the mood we want.', image: '' },
]

export const defaultFaqs = [
  { id: 'f1', question: 'What software do you edit in?', answer: 'Every project is cut and graded in DaVinci Resolve, with motion graphics built in After Effects.' },
  { id: 'f2', question: 'How long does a typical edit take?', answer: 'Reels and shorts usually take 1-2 days; long-form wedding or commercial edits take 3-7 days depending on scope.' },
  { id: 'f3', question: 'How can I reach you?', answer: 'WhatsApp is fastest for quick questions — you can also email or DM on Instagram from the Contact page.' },
]


