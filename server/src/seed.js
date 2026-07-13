import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { prisma } from './db.js'

const defaultContact = {
  ownerName: 'Naveen',
  phone: '+91 8824096308',
  whatsappNumber: '918824096308',
  email: 'navv.fxx@gmail.com',
  instagramUrl: 'https://www.instagram.com/navv.fx',
  instagramHandle: '@navv.fx',
  youtubeUrl: '',
  linkedinUrl: '',
}

const defaultHero = {
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

const defaultAbout = {
  photoUrl: '',
  story:
    "I'm Naveen, a cinematic video editor with 6+ years of experience shaping raw footage into stories worth watching. My craft lives in DaVinci Resolve for colour and pace, and After Effects for motion.",
  mission: 'To give every client a final cut that feels inevitable — nothing wasted, every frame earning its place.',
  resumeUrl: '',
  skills: [
    { name: 'DaVinci Resolve', level: 95 },
    { name: 'After Effects', level: 90 },
    { name: 'Colour Grading', level: 92 },
    { name: 'Motion Graphics', level: 85 },
    { name: 'Sound Design', level: 78 },
  ],
}

const defaultSettings = {
  siteName: 'NAVEEN',
  tagline: 'Cinematic Video Editor',
  footerText: `© ${new Date().getFullYear()} Naveen. All rights reserved.`,
  themeAccent: '#8B14E1',
}

const defaultServices = [
  { name: 'Video Editing', icon: 'FaFilm', description: 'Precise, story-first edits for any format.' },
  { name: 'Wedding Editing', icon: 'FaHeart', description: 'Cinematic wedding films that hold emotion.' },
  { name: 'YouTube Editing', icon: 'FaYoutube', description: 'Retention-first cuts built for watch time.' },
  { name: 'Instagram Reels', icon: 'FaInstagram', description: 'Fast, scroll-stopping vertical edits.' },
  { name: 'Motion Graphics', icon: 'FaShapes', description: 'Titles, lower-thirds & animated logos.' },
  { name: 'Colour Grading', icon: 'FaPalette', description: 'Mood-driven grades in DaVinci Resolve.' },
]

const defaultFaqs = [
  { question: 'What software do you edit in?', answer: 'Every project is cut and graded in DaVinci Resolve, with motion graphics built in After Effects.' },
  { question: 'How long does a typical edit take?', answer: 'Reels and shorts usually take 1-2 days; long-form edits take 3-7 days depending on scope.' },
  { question: 'How can I reach you?', answer: 'WhatsApp is fastest for quick questions — you can also email or DM on Instagram from the Contact page.' },
]

export async function runSeed() {
  const email = (process.env.OWNER_EMAIL || '').toLowerCase().trim()
  const password = process.env.OWNER_PASSWORD

  if (!email || !password) {
    throw new Error('OWNER_EMAIL and OWNER_PASSWORD must be set before seeding.')
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.adminUser.create({ data: { email, passwordHash } })
    console.log(`✔ Owner account created: ${email}`)
  } else {
    console.log(`— Owner account already exists: ${email}`)
  }

  await prisma.siteContent.upsert({ where: { id: 'contact' }, create: { id: 'contact', data: defaultContact }, update: {} })
  await prisma.siteContent.upsert({ where: { id: 'hero' }, create: { id: 'hero', data: defaultHero }, update: {} })
  await prisma.siteContent.upsert({ where: { id: 'about' }, create: { id: 'about', data: defaultAbout }, update: {} })
  await prisma.siteContent.upsert({ where: { id: 'settings' }, create: { id: 'settings', data: defaultSettings }, update: {} })

  const existingServices = await prisma.item.count({ where: { collection: 'services' } })
  if (existingServices === 0) {
    for (const s of defaultServices) {
      await prisma.item.create({ data: { collection: 'services', data: s } })
    }
    console.log(`✔ Seeded ${defaultServices.length} default services`)
  }

  const existingFaqs = await prisma.item.count({ where: { collection: 'faqs' } })
  if (existingFaqs === 0) {
    for (const f of defaultFaqs) {
      await prisma.item.create({ data: { collection: 'faqs', data: f } })
    }
    console.log(`✔ Seeded ${defaultFaqs.length} default FAQs`)
  }

  console.log('Seed complete.')
}

// Only run immediately (and disconnect Prisma afterwards) when this file is
// executed directly via `npm run seed`. When imported by index.js for
// auto-seeding on server startup, it must NOT disconnect the shared client.
const isRunDirectly = process.argv[1] && process.argv[1].endsWith('seed.js')
if (isRunDirectly) {
  runSeed()
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
    .finally(() => prisma.$disconnect())
}