import { useState, useEffect, useRef } from 'react'
import { fetchVideoMetadata } from '../utils/youtubeUtils'
import './VideoCard.css'

function VideoCard({ videoUrl }) {
  const [metadata, setMetadata] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const titleRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldScroll, setShouldScroll] = useState(false)
  const [scrollDistance, setScrollDistance] = useState(0)

  useEffect(() => {
    const loadMetadata = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchVideoMetadata(videoUrl)
        setMetadata(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadMetadata()
  }, [videoUrl])

  useEffect(() => {
    if (titleRef.current && containerRef.current && metadata) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        if (titleRef.current && containerRef.current) {
          const titleWidth = titleRef.current.scrollWidth
          const containerWidth = containerRef.current.offsetWidth
          const needsScroll = titleWidth > containerWidth
          setShouldScroll(needsScroll)
          if (needsScroll && titleRef.current) {
            const distance = titleWidth - containerWidth + 20
            setScrollDistance(distance)
            titleRef.current.style.setProperty('--scroll-distance', `-${distance}px`)
          }
        }
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [metadata])

  const handleCardClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  if (isLoading) {
    return (
      <div className="video-card">
        <div className="video-thumbnail-container">
          <div className="video-loading">Loading...</div>
        </div>
      </div>
    )
  }

  if (error || !metadata) {
    return (
      <div className="video-card">
        <div className="video-thumbnail-container">
          <div className="video-error">Failed to load video</div>
        </div>
      </div>
    )
  }

  return (
    <div className="video-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="video-thumbnail-container">
        {metadata.thumbnailUrl ? (
          <img 
            src={metadata.thumbnailUrl} 
            alt={metadata.title}
            className="video-thumbnail"
            onError={(e) => {
              // Fallback to default thumbnail if maxresdefault fails
              const videoId = metadata.videoId
              if (videoId) {
                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              }
            }}
          />
        ) : (
          <div className="video-placeholder">No thumbnail</div>
        )}
      </div>
      <div className="video-info">
        <div className="video-title-container" ref={containerRef}>
          <div className={`video-title-scroll ${shouldScroll ? 'scrollable' : ''}`}>
            <span 
              className="video-title-text" 
              ref={titleRef}
            >
              {metadata.title}
            </span>
          </div>
        </div>
        <div className="video-details">
          {metadata.authorName && (
            <span className="video-author">{metadata.authorName}</span>
          )}
          {metadata.duration && (
            <span className="video-duration">{metadata.duration}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard

