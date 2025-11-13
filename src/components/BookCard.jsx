import { useState, useEffect, useRef } from 'react'
import { getBookCoverUrl, getPlaceholderCover, fetchGoogleBooksCover } from '../utils/bookCoverUtils'
import { getCachedCover, setCachedCover, isFetchingCover, setFetchingCover, clearFetchingCover } from '../utils/coverCache'
import BookModal from './BookModal'
import './BookCard.css'

function BookCard({ book }) {
  const [coverUrl, setCoverUrl] = useState(() => {
    // Check cache first
    const cached = getCachedCover(book.id)
    if (cached) {
      return cached
    }
    return getBookCoverUrl(book)
  })
  const [isLoading, setIsLoading] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasFetchedRef = useRef(false)

  // Try to fetch cover from multiple sources
  useEffect(() => {
    // Check cache first
    const cached = getCachedCover(book.id)
    if (cached) {
      setCoverUrl(cached)
      setIsLoading(false)
      return
    }

    // Don't fetch if already fetching or already fetched
    if (hasFetchedRef.current || isFetchingCover(book.id)) {
      return
    }

    const loadCover = async () => {
      // Check cache again in case it was set by another component
      const cachedAgain = getCachedCover(book.id)
      if (cachedAgain) {
        setCoverUrl(cachedAgain)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setAttempts(0)
      setFetchingCover(book.id)
      hasFetchedRef.current = true
      
      // Add a small delay based on book ID to stagger API calls and avoid rate limiting
      const delay = (book.id % 10) * 50 // Stagger by 50ms increments
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      
      // Start with Open Library (if ISBN available)
      let initialUrl = getBookCoverUrl(book)
      setCoverUrl(initialUrl)
      
      // Try Google Books API - first by ISBN, then by title/author
      if (!book.coverImage) {
        try {
          let googleCover = null
          
          // Try ISBN first if available
          if (book.isbn || book.isbn10) {
            const isbn = book.isbn || book.isbn10
            googleCover = await fetchGoogleBooksCover(isbn)
          }
          
          // If no cover from ISBN, try title and author
          if (!googleCover && book.title && book.authors && book.authors.length > 0) {
            const { fetchGoogleBooksCoverByTitle } = await import('../utils/bookCoverUtils')
            googleCover = await fetchGoogleBooksCoverByTitle(book.title, book.authors)
          }
          
          if (googleCover) {
            setCoverUrl(googleCover)
            setCachedCover(book.id, googleCover)
            setIsLoading(false)
            clearFetchingCover(book.id)
            return
          }
        } catch (error) {
          console.error('Error fetching Google Books cover:', error)
        }
      }
      
      // Cache the initial URL if it's not a placeholder
      if (initialUrl && !initialUrl.includes('data:image/svg+xml')) {
        setCachedCover(book.id, initialUrl)
      }
      
      // Fall back to Open Library or placeholder
      setIsLoading(false)
      clearFetchingCover(book.id)
    }
    
    loadCover()
  }, [book.id]) // Only depend on book.id, not the whole book object

  const handleImageError = async (e) => {
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    
    // Try different fallback strategies based on attempt count
    if (newAttempts === 1) {
      // First fallback: Try ISBN-10 if we tried ISBN-13, or vice versa
      if (book.isbn10 && book.isbn && coverUrl.includes(book.isbn.replace(/[-\s]/g, ''))) {
        const isbn10Url = `https://covers.openlibrary.org/b/isbn/${book.isbn10.replace(/[-\s]/g, '')}-L.jpg`
        e.target.src = isbn10Url
        setCoverUrl(isbn10Url)
        setCachedCover(book.id, isbn10Url)
        return
      }
      if (book.isbn && book.isbn10 && coverUrl.includes(book.isbn10.replace(/[-\s]/g, ''))) {
        const isbn13Url = `https://covers.openlibrary.org/b/isbn/${book.isbn.replace(/[-\s]/g, '')}-L.jpg`
        e.target.src = isbn13Url
        setCoverUrl(isbn13Url)
        setCachedCover(book.id, isbn13Url)
        return
      }
    }
    
    if (newAttempts === 2) {
      // Second fallback: Try Google Books API (with small delay to avoid rate limiting)
      if (book.isbn || book.isbn10) {
        await new Promise(resolve => setTimeout(resolve, 100)) // Small delay
        const isbn = book.isbn || book.isbn10
        const googleCover = await fetchGoogleBooksCover(isbn)
        if (googleCover) {
          e.target.src = googleCover
          setCoverUrl(googleCover)
          setCachedCover(book.id, googleCover)
          return
        }
      }
    }
    
    if (newAttempts === 3) {
      // Third fallback: Try medium size instead of large
      if (book.isbn10) {
        const mediumUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn10.replace(/[-\s]/g, '')}-M.jpg`
        e.target.src = mediumUrl
        setCoverUrl(mediumUrl)
        setCachedCover(book.id, mediumUrl)
        return
      }
      if (book.isbn) {
        const mediumUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn.replace(/[-\s]/g, '')}-M.jpg`
        e.target.src = mediumUrl
        setCoverUrl(mediumUrl)
        setCachedCover(book.id, mediumUrl)
        return
      }
    }
    
    if (newAttempts === 4) {
      // Fourth fallback: Try Goodreads ID via Open Library
      if (book.goodreadsId) {
        const goodreadsUrl = `https://covers.openlibrary.org/b/goodreads/${book.goodreadsId}-L.jpg`
        e.target.src = goodreadsUrl
        setCoverUrl(goodreadsUrl)
        setCachedCover(book.id, goodreadsUrl)
        return
      }
    }
    
    // Final fallback to placeholder
    const placeholder = getPlaceholderCover()
    e.target.src = placeholder
    setCoverUrl(placeholder)
    setIsLoading(false)
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="book-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="book-cover-container">
          <img 
            src={coverUrl} 
            alt={`${book.title} cover`}
            className="book-cover"
            onError={handleImageError}
          />
          <div className="book-overlay">
            <div className="book-overlay-content">
              <h3 className="book-overlay-title">{book.title}</h3>
              <p className="book-overlay-authors">
                {book.authors.join(', ')}
              </p>
              {book.tags && book.tags.length > 0 && (
                <div className="book-overlay-tags">
                  {book.tags.map((tag, index) => (
                    <span key={index} className="book-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BookModal 
        book={book} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default BookCard

