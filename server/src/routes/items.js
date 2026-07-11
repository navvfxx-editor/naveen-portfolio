import { Router } from 'express'
import { prisma } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const ALLOWED_COLLECTIONS = ['services', 'portfolio', 'testimonials', 'faqs', 'messages']

function checkCollection(req, res, next) {
  if (!ALLOWED_COLLECTIONS.includes(req.params.collection)) {
    return res.status(404).json({ error: 'Unknown collection.' })
  }
  next()
}

function toApiShape(row) {
  return { id: row.id, ...row.data, createdAt: row.createdAt, updatedAt: row.updatedAt }
}

// Public read — the site's public pages fetch these directly.
router.get('/:collection', checkCollection, async (req, res) => {
  const rows = await prisma.item.findMany({
    where: { collection: req.params.collection },
    orderBy: { createdAt: 'desc' },
  })
  res.json(rows.map(toApiShape))
})

// Owner-only write operations.
router.post('/:collection', checkCollection, requireAuth, async (req, res) => {
  const row = await prisma.item.create({
    data: { collection: req.params.collection, data: req.body },
  })
  res.status(201).json(toApiShape(row))
})

router.put('/:collection/:id', checkCollection, requireAuth, async (req, res) => {
  const existing = await prisma.item.findUnique({ where: { id: req.params.id } })
  if (!existing || existing.collection !== req.params.collection) {
    return res.status(404).json({ error: 'Not found.' })
  }
  const row = await prisma.item.update({
    where: { id: req.params.id },
    data: { data: req.body },
  })
  res.json(toApiShape(row))
})

router.delete('/:collection/:id', checkCollection, requireAuth, async (req, res) => {
  const existing = await prisma.item.findUnique({ where: { id: req.params.id } })
  if (!existing || existing.collection !== req.params.collection) {
    return res.status(404).json({ error: 'Not found.' })
  }
  await prisma.item.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

export default router
