import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'
import itemsRoutes from './routes/items.js'
import uploadRoutes from './routes/upload.js'

const app = express()

const allowedOrigins = (process.env.FRONTEND_URL || '').split(',').map((s) => s.trim()).filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl, health checks) with no origin header.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('Not allowed by CORS'))
    },
  }),
)
app.use(express.json({ limit: '5mb' }))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.get('/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/items', itemsRoutes)
app.use('/api/upload', uploadRoutes)

// Central error handler — keeps error messages consistent for the frontend.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong.' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
