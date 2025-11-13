import { Link } from 'react-router-dom'
import { useDecodingText } from '../hooks/useDecodingText'
import VideoCard from '../components/VideoCard'
import { videos } from '../data/videos'
import './Page.css'
import './VideoRecommendations.css'

function VideoRecommendations() {
  const displayText = useDecodingText('Video Recommendations')

  return (
    <div className="page">
      <Link to="/resources" className="video-back-link">
        &lt; Resources
      </Link>
      <h1 className="page-title">{displayText}</h1>
      
      {videos.length === 0 ? (
        <div className="no-videos-message">
          No videos added yet. Add YouTube URLs to <code>src/data/videos.js</code>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map((videoUrl, index) => (
            <VideoCard key={index} videoUrl={videoUrl} />
          ))}
        </div>
      )}
    </div>
  )
}

export default VideoRecommendations

