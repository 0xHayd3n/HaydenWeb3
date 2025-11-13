import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDecodingText } from '../hooks/useDecodingText'
import BookCard from '../components/BookCard'
import { books } from '../data/books'
import './Page.css'
import './ReadingRecommendations.css'

function ReadingRecommendations() {
  const displayText = useDecodingText('Reading Recommendations')
  const [selectedTags, setSelectedTags] = useState([])

  // Get all unique tags from all books
  const allTags = useMemo(() => {
    const tagSet = new Set()
    books.forEach(book => {
      if (book.tags && Array.isArray(book.tags)) {
        book.tags.forEach(tag => tagSet.add(tag))
      }
    })
    return Array.from(tagSet).sort()
  }, [])

  // Filter books based on selected tags
  const filteredBooks = useMemo(() => {
    if (selectedTags.length === 0) {
      return books
    }
    return books.filter(book => {
      if (!book.tags || !Array.isArray(book.tags)) {
        return false
      }
      // Book must have at least one of the selected tags
      return selectedTags.some(tag => book.tags.includes(tag))
    })
  }, [selectedTags])

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  return (
    <div className="page">
      <Link to="/resources" className="reading-back-link">
        &lt; Resources
      </Link>
      <h1 className="page-title">{displayText}</h1>
      
      <div className="book-filters">
        <div className="book-filters-header">
          <span className="book-filters-label">Filter by tags:</span>
          {selectedTags.length > 0 && (
            <button className="book-filters-clear" onClick={clearFilters}>
              Clear all
            </button>
          )}
        </div>
        <div className="book-filters-tags">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`book-filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <div className="book-filters-count">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        )}
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="no-books-message">
            No books match the selected filters.
          </div>
        )}
      </div>
    </div>
  )
}

export default ReadingRecommendations

