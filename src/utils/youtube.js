/**
 * Accepts a pasted YouTube URL in any common format (watch, youtu.be,
 * shorts, embed) — or a bare 11-character video ID — and returns just the
 * video ID. Falls back to returning the raw input if nothing matches, so we
 * never silently drop data the admin typed in.
 */
export function extractYoutubeId(input) {
  if (!input) return ''
  const trimmed = input.trim()

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

  const patterns = [
    /youtube\.com\/watch\?[^#]*\bv=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = trimmed.match(pattern)
    if (match) return match[1]
  }

  return trimmed
}

export function youtubeThumbnail(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
