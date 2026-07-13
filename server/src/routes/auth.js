import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// There is intentionally NO /signup route. The single owner account is
// created once via `npm run seed` (see src/seed.js).
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const user = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } })
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }

  // Long-lived on purpose — this is a single-owner tool, so once logged in
  // the owner should stay logged in until they explicitly hit Logout,
  // rather than being forced to re-enter credentials every few days.
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '3650d' })
  res.json({ token, email: user.email })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ email: req.user.email })
})

export default router
