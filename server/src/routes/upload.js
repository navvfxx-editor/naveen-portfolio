import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const UPLOAD_DIR = path.join(process.cwd(), 'uploads')
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const safeName = `${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`
    cb(null, safeName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB — video files can be large
})

// Owner-only — only the logged-in owner can upload logos, thumbnails, resume, etc.
router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' })
  const publicUrl = `${process.env.PUBLIC_URL}/uploads/${req.file.filename}`
  res.json({ url: publicUrl })
})

export default router
