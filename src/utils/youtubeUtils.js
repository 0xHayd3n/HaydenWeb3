/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 */
export function extractVideoId(url) {
  if (!url) return null

  // Remove any trailing slashes and whitespace
  url = url.trim()

  // Match various YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Get YouTube thumbnail URL from video ID
 */
export function getThumbnailUrl(videoId) {
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

/**
 * Fetch video metadata from YouTube oEmbed API
 * Returns: { title, thumbnail_url, html, author_name, etc. }
 */
export async function fetchVideoMetadata(youtubeUrl) {
  try {
    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      throw new Error('Invalid YouTube URL')
    }

    // Use YouTube oEmbed API (no API key required)
    const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`
    
    const response = await fetch(oEmbedUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video metadata: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      title: data.title || 'Untitled Video',
      thumbnailUrl: getThumbnailUrl(videoId),
      videoId: videoId,
      videoUrl: youtubeUrl,
      authorName: data.author_name || '',
      html: data.html || ''
    }
  } catch (error) {
    console.error('Error fetching YouTube video metadata:', error)
    // Return fallback data
    const videoId = extractVideoId(youtubeUrl)
    return {
      title: 'Video',
      thumbnailUrl: videoId ? getThumbnailUrl(videoId) : null,
      videoId: videoId,
      videoUrl: youtubeUrl,
      authorName: '',
      html: '',
      error: error.message
    }
  }
}

/**
 * Batch fetch metadata for multiple YouTube URLs
 */
export async function fetchMultipleVideoMetadata(urls) {
  // Fetch all videos in parallel with a small delay to avoid rate limiting
  const promises = urls.map((url, index) => {
    const delay = index * 100 // Stagger requests by 100ms
    return new Promise(resolve => {
      setTimeout(async () => {
        const metadata = await fetchVideoMetadata(url)
        resolve(metadata)
      }, delay)
    })
  })

  return Promise.all(promises)
}

