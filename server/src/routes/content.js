import { Router } from 'express'
import { prisma } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const ALLOWED_IDS = ['settings', 'hero', 'about', 'contact']

function checkId(req, res, next) {
  if (!ALLOWED_IDS.includes(req.params.id)) {
    return res.status(404).json({ error: 'Unknown content section.' })
  }
  next()
}

// Public read — anyone visiting the site needs this to render pages.
router.get('/:id', checkId, async (req, res) => {
  const row = await prisma.siteContent.findUnique({ where: { id: req.params.id } })
  res.json(row ? row.data : null)
})

// Owner-only write.
router.put('/:id', checkId, requireAuth, async (req, res) => {
  const row = await prisma.siteContent.upsert({
    where: { id: req.params.id },
    create: { id: req.params.id, data: req.body },
    update: { data: req.body },
  })
  res.json(row.data)
})

export default router
