// Simple in-memory cache for book covers
const coverCache = new Map()

/**
 * Get cached cover URL for a book
 * @param {string} bookId - Book ID
 * @returns {string|null} Cached cover URL or null
 */
export function getCachedCover(bookId) {
  return coverCache.get(bookId) || null
}

/**
 * Cache a cover URL for a book
 * @param {string} bookId - Book ID
 * @param {string} coverUrl - Cover URL to cache
 */
export function setCachedCover(bookId, coverUrl) {
  if (coverUrl && coverUrl !== '') {
    coverCache.set(bookId, coverUrl)
  }
}

/**
 * Check if a cover is currently being fetched
 */
const fetchingCovers = new Set()

/**
 * Check if a cover is being fetched
 * @param {string} bookId - Book ID
 * @returns {boolean}
 */
export function isFetchingCover(bookId) {
  return fetchingCovers.has(bookId)
}

/**
 * Mark a cover as being fetched
 * @param {string} bookId - Book ID
 */
export function setFetchingCover(bookId) {
  fetchingCovers.add(bookId)
}

/**
 * Mark a cover as no longer being fetched
 * @param {string} bookId - Book ID
 */
export function clearFetchingCover(bookId) {
  fetchingCovers.delete(bookId)
}

