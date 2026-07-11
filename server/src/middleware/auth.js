import jwt from 'jsonwebtoken'

/**
 * Requires a valid Bearer token signed with JWT_SECRET. Since there is only
 * ever ONE row in AdminUser (created by `npm run seed`), a valid token is
 * always the owner — there's no role to check beyond "token is valid".
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload // { email }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session — please log in again.' })
  }
}
