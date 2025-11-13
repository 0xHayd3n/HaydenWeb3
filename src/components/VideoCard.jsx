import { useState, useEffect } from 'react'
import { fetchVideoMetadata } from '../utils/youtubeUtils'
import './VideoCard.css'

function VideoCard({ videoUrl }) {
  const [metadata, setMetadata] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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
        <div className="video-overlay">
          <div className="video-overlay-content">
            <h3 className="video-overlay-title">{metadata.title}</h3>
            {metadata.authorName && (
              <p className="video-overlay-author">{metadata.authorName}</p>
            )}
          </div>
        </div>
      </div>
      <div className="video-title">{metadata.title}</div>
    </div>
  )
}

export default VideoCard

