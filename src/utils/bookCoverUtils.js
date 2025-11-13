/**
 * Generates book cover image URLs from various sources
 * Supports: ISBN, Goodreads ID, Open Library ID
 */

/**
 * Get Open Library cover URL from ISBN
 * @param {string} isbn - ISBN-10 or ISBN-13
 * @returns {string} Cover image URL
 */
export function getOpenLibraryCover(isbn) {
  // Remove any dashes or spaces from ISBN
  const cleanIsbn = isbn.replace(/[-\s]/g, '')
  // Open Library supports both ISBN-10 and ISBN-13
  // Try large size first, fallback to medium if needed
  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`
}

/**
 * Get Open Library cover URL from ISBN-10 (sometimes more reliable)
 * @param {string} isbn10 - ISBN-10
 * @returns {string} Cover image URL
 */
export function getOpenLibraryCoverFromISBN10(isbn10) {
  const cleanIsbn = isbn10.replace(/[-\s]/g, '')
  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`
}

/**
 * Get Goodreads cover URL from Goodreads book ID
 * Note: Goodreads doesn't allow direct hotlinking, so this may not work reliably
 * @param {string|number} goodreadsId - Goodreads book ID
 * @returns {string} Cover image URL
 */
export function getGoodreadsCover(goodreadsId) {
  // Goodreads cover URL format (may not work due to hotlinking restrictions)
  // Format: https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/[timestamp]/[id]_[size].jpg
  // Alternative format that sometimes works:
  return `https://covers.openlibrary.org/b/goodreads/${goodreadsId}-L.jpg`
}

/**
 * Fetch Google Books cover URL from ISBN using their API
 * @param {string} isbn - ISBN-10 or ISBN-13
 * @returns {Promise<string>} Cover image URL or null
 */
export async function fetchGoogleBooksCover(isbn) {
  const cleanIsbn = isbn.replace(/[-\s]/g, '')
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`)
    const data = await response.json()
    if (data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks) {
      // Return the largest available image
      return data.items[0].volumeInfo.imageLinks.extraLarge || 
             data.items[0].volumeInfo.imageLinks.large || 
             data.items[0].volumeInfo.imageLinks.medium ||
             data.items[0].volumeInfo.imageLinks.small ||
             data.items[0].volumeInfo.imageLinks.thumbnail ||
             null
    }
  } catch (error) {
    console.error('Error fetching Google Books cover:', error)
  }
  return null
}

/**
 * Fetch Google Books cover URL from title and author using their API
 * @param {string} title - Book title
 * @param {Array<string>} authors - Book authors
 * @returns {Promise<string>} Cover image URL or null
 */
export async function fetchGoogleBooksCoverByTitle(title, authors) {
  try {
    // Build search query with title and first author
    const authorQuery = authors && authors.length > 0 ? `+inauthor:${authors[0].replace(/\s+/g, '+')}` : ''
    const titleQuery = title.replace(/\s+/g, '+')
    const query = `intitle:${titleQuery}${authorQuery}`
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    if (data.items && data.items[0] && data.items[0].volumeInfo && data.items[0].volumeInfo.imageLinks) {
      // Return the largest available image
      return data.items[0].volumeInfo.imageLinks.extraLarge || 
             data.items[0].volumeInfo.imageLinks.large || 
             data.items[0].volumeInfo.imageLinks.medium ||
             data.items[0].volumeInfo.imageLinks.small ||
             data.items[0].volumeInfo.imageLinks.thumbnail ||
             null
    }
  } catch (error) {
    console.error('Error fetching Google Books cover by title:', error)
  }
  return null
}

/**
 * Automatically generates the best available cover URL for a book
 * Priority: ISBN-10 (Open Library) > ISBN-13 (Open Library) > Goodreads ID (via Open Library) > Placeholder
 * @param {Object} book - Book object with optional isbn, isbn10, goodreadsId, or coverImage
 * @returns {string} Cover image URL
 */
export function getBookCoverUrl(book) {
  // If coverImage is explicitly provided, use it
  if (book.coverImage) {
    return book.coverImage
  }

  // Try Open Library with ISBN-10 first (sometimes more reliable)
  if (book.isbn10) {
    return getOpenLibraryCoverFromISBN10(book.isbn10)
  }

  // Try Open Library with ISBN-13 (most common format)
  if (book.isbn) {
    return getOpenLibraryCover(book.isbn)
  }

  // Try Goodreads ID via Open Library (if available)
  if (book.goodreadsId) {
    return getGoodreadsCover(book.goodreadsId)
  }

  // Fallback to placeholder
  return getPlaceholderCover()
}

/**
 * Get a placeholder cover image
 * @returns {string} Placeholder SVG data URL
 */
export function getPlaceholderCover() {
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect width="200" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="%23999"%3ENo Cover%3C/text%3E%3C/svg%3E'
}

