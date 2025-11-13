import { useDecodingText } from '../hooks/useDecodingText'
import ResourceTile from '../components/ResourceTile'
import './Page.css'
import './Resources.css'

function Resources() {
  const displayText = useDecodingText('Resources')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="resources-grid">
        <ResourceTile 
          title="Reading Recommendations" 
          to="/resources/reading-recommendations"
        >
          A curated collection of books worth reading.
        </ResourceTile>
      </div>
    </div>
  )
}

export default Resources

