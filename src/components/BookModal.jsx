import { useState, useEffect } from 'react'
import { fetchGoogleBooksCover } from '../utils/bookCoverUtils'
import './BookModal.css'

function BookModal({ book, isOpen, onClose }) {
  const [bookDetails, setBookDetails] = useState(null)
  const [coverUrl, setCoverUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openTabs, setOpenTabs] = useState({
    description: true,
    details: false,
    tags: false
  })

  useEffect(() => {
    if (isOpen && book) {
      fetchBookDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, book])

  const fetchBookDetails = async () => {
    setLoading(true)
    try {
      // Fetch from Google Books API - try ISBN first, then title/author
      let response = null
      let data = null
      
      const isbn = book.isbn || book.isbn10
      if (isbn) {
        const cleanIsbn = isbn.replace(/[-\s]/g, '')
        response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`)
        data = await response.json()
      }
      
      // If no results from ISBN, try searching by title and author
      if ((!data || !data.items || data.items.length === 0) && book.title && book.authors && book.authors.length > 0) {
        const authorQuery = book.authors[0].replace(/\s+/g, '+')
        const titleQuery = book.title.replace(/\s+/g, '+')
        const query = `intitle:${titleQuery}+inauthor:${authorQuery}`
        response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
        data = await response.json()
      }
      
      if (data && data.items && data.items.length > 0) {
        const volumeInfo = data.items[0].volumeInfo
        const saleInfo = data.items[0].saleInfo
        
        // Get Amazon link - construct from ISBN
        let amazonLink = null
        // Try to find ISBN from industryIdentifiers or use provided ISBN
        let isbnForAmazon = book.isbn10 || book.isbn
        if (volumeInfo.industryIdentifiers) {
          const isbn10 = volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_10')
          if (isbn10) {
            isbnForAmazon = isbn10.identifier
          } else {
            const isbn13 = volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_13')
            if (isbn13) {
              isbnForAmazon = isbn13.identifier
            }
          }
        }
        if (isbnForAmazon) {
          const cleanIsbn = isbnForAmazon.replace(/[-\s]/g, '')
          // Construct Amazon search URL from ISBN
          amazonLink = `https://www.amazon.com/s?k=${cleanIsbn}&i=stripbooks`
        } else if (book.title) {
          // Fallback to title search if no ISBN
          const titleQuery = book.title.replace(/\s+/g, '+')
          amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(titleQuery)}&i=stripbooks`
        }
        
        setBookDetails({
          title: volumeInfo.title || book.title,
          subtitle: volumeInfo.subtitle,
          authors: volumeInfo.authors || book.authors,
          description: volumeInfo.description || 'No description available.',
          publishedDate: volumeInfo.publishedDate,
          pageCount: volumeInfo.pageCount,
          categories: volumeInfo.categories || [],
          language: volumeInfo.language,
          publisher: volumeInfo.publisher,
          averageRating: volumeInfo.averageRating,
          ratingsCount: volumeInfo.ratingsCount,
          maturityRating: volumeInfo.maturityRating,
          contentVersion: volumeInfo.contentVersion,
          printType: volumeInfo.printType,
          industryIdentifiers: volumeInfo.industryIdentifiers,
          previewLink: volumeInfo.previewLink,
          infoLink: volumeInfo.infoLink,
          canonicalVolumeLink: volumeInfo.canonicalVolumeLink,
          amazonLink: amazonLink,
          imageLinks: volumeInfo.imageLinks
        })
        
        // Get cover image
        if (volumeInfo.imageLinks) {
          const cover = volumeInfo.imageLinks.extraLarge || 
                       volumeInfo.imageLinks.large || 
                       volumeInfo.imageLinks.medium ||
                       volumeInfo.imageLinks.small ||
                       volumeInfo.imageLinks.thumbnail
          if (cover) {
            setCoverUrl(cover)
          } else {
            // Fallback to our utility
            if (isbn) {
              const fallbackCover = await fetchGoogleBooksCover(isbn)
              setCoverUrl(fallbackCover)
            }
          }
        } else {
          if (isbn) {
            const fallbackCover = await fetchGoogleBooksCover(isbn)
            setCoverUrl(fallbackCover)
          }
        }
      } else {
        // Fallback to book data if API doesn't return results
        setBookDetails({
          title: book.title,
          authors: book.authors,
          description: 'No description available.',
          categories: book.tags || []
        })
      }
    } catch (error) {
      console.error('Error fetching book details:', error)
      // Fallback to book data
      setBookDetails({
        title: book.title,
        authors: book.authors,
        description: 'No description available.',
        categories: book.tags || []
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !book) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="book-modal-backdrop" onClick={handleBackdropClick}>
      <div className="book-modal" onClick={(e) => e.stopPropagation()}>
        <button className="book-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        
        {loading ? (
          <div className="book-modal-loading">Loading...</div>
        ) : (
          <div className="book-modal-content">
            <div className="book-modal-left">
              {coverUrl && (
                <img 
                  src={coverUrl} 
                  alt={`${bookDetails?.title || book.title} cover`}
                  className="book-modal-cover"
                />
              )}
            </div>
            
            <div className="book-modal-right">
              <div className="book-modal-header">
                <h2 className="book-modal-title">
                  {bookDetails?.title || book.title}
                </h2>
                <p className="book-modal-authors">
                  {bookDetails?.authors?.join(', ') || book.authors.join(', ')}
                </p>
                {book.tags && book.tags.length > 0 && (
                  <div className="book-modal-header-tags">
                    {book.tags.map((tag, index) => (
                      <span key={index} className="book-tag">{tag}</span>
                    ))}
                  </div>
                )}
                {bookDetails?.amazonLink && (
                  <a 
                    href={bookDetails.amazonLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="book-modal-amazon-button"
                  >
                    View on Amazon
                  </a>
                )}
              </div>

              <div className="book-modal-accordion">
                <div className="book-modal-accordion-item">
                  <button
                    className={`book-modal-accordion-header ${openTabs.description ? 'open' : ''}`}
                    onClick={() => setOpenTabs(prev => ({ ...prev, description: !prev.description }))}
                  >
                    <span>Description</span>
                    <span className="book-modal-accordion-icon">{openTabs.description ? '−' : '+'}</span>
                  </button>
                  {openTabs.description && (
                    <div className="book-modal-accordion-content">
                      <div className="book-modal-description">
                        {bookDetails?.description ? (
                          <p>{bookDetails.description}</p>
                        ) : (
                          <p>No description available.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="book-modal-accordion-item">
                  <button
                    className={`book-modal-accordion-header ${openTabs.details ? 'open' : ''}`}
                    onClick={() => setOpenTabs(prev => ({ ...prev, details: !prev.details }))}
                  >
                    <span>Details</span>
                    <span className="book-modal-accordion-icon">{openTabs.details ? '−' : '+'}</span>
                  </button>
                  {openTabs.details && (
                    <div className="book-modal-accordion-content">
                      <div className="book-modal-details">
                        {bookDetails?.subtitle && (
                          <div className="book-detail-item">
                            <strong>Subtitle:</strong> {bookDetails.subtitle}
                          </div>
                        )}
                        {bookDetails?.publishedDate && (
                          <div className="book-detail-item">
                            <strong>Published:</strong> {bookDetails.publishedDate}
                          </div>
                        )}
                        {bookDetails?.publisher && (
                          <div className="book-detail-item">
                            <strong>Publisher:</strong> {bookDetails.publisher}
                          </div>
                        )}
                        {bookDetails?.pageCount && (
                          <div className="book-detail-item">
                            <strong>Pages:</strong> {bookDetails.pageCount}
                          </div>
                        )}
                        {bookDetails?.language && (
                          <div className="book-detail-item">
                            <strong>Language:</strong> {bookDetails.language.toUpperCase()}
                          </div>
                        )}
                        {bookDetails?.printType && (
                          <div className="book-detail-item">
                            <strong>Print Type:</strong> {bookDetails.printType}
                          </div>
                        )}
                        {bookDetails?.averageRating && (
                          <div className="book-detail-item">
                            <strong>Rating:</strong> {bookDetails.averageRating} / 5
                            {bookDetails.ratingsCount && (
                              <span> ({bookDetails.ratingsCount} ratings)</span>
                            )}
                          </div>
                        )}
                        {bookDetails?.maturityRating && (
                          <div className="book-detail-item">
                            <strong>Maturity Rating:</strong> {bookDetails.maturityRating}
                          </div>
                        )}
                        {bookDetails?.contentVersion && (
                          <div className="book-detail-item">
                            <strong>Content Version:</strong> {bookDetails.contentVersion}
                          </div>
                        )}
                        {bookDetails?.categories && bookDetails.categories.length > 0 && (
                          <div className="book-detail-item">
                            <strong>Categories:</strong> {bookDetails.categories.join(', ')}
                          </div>
                        )}
                        {bookDetails?.industryIdentifiers && bookDetails.industryIdentifiers.length > 0 && (
                          <div className="book-detail-item">
                            <strong>ISBN:</strong> {
                              bookDetails.industryIdentifiers.map((id, idx) => (
                                <span key={idx}>
                                  {id.type}: {id.identifier}
                                  {idx < bookDetails.industryIdentifiers.length - 1 ? ', ' : ''}
                                </span>
                              ))
                            }
                          </div>
                        )}
                        {bookDetails?.previewLink && (
                          <div className="book-detail-item">
                            <strong>Preview:</strong>{' '}
                            <a href={bookDetails.previewLink} target="_blank" rel="noopener noreferrer" className="book-detail-link">
                              View Preview
                            </a>
                          </div>
                        )}
                        {!bookDetails?.subtitle && !bookDetails?.publishedDate && !bookDetails?.pageCount && 
                         !bookDetails?.publisher && !bookDetails?.language && !bookDetails?.printType &&
                         !bookDetails?.averageRating && !bookDetails?.maturityRating && 
                         !bookDetails?.contentVersion && (!bookDetails?.categories || bookDetails.categories.length === 0) &&
                         (!bookDetails?.industryIdentifiers || bookDetails.industryIdentifiers.length === 0) && (
                          <p>No additional details available.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookModal

