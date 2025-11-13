import { useDecodingText } from '../hooks/useDecodingText'
import ResourceTile from '../components/ResourceTile'
import './Page.css'
import './Tools.css'

function Tools() {
  const displayText = useDecodingText('Tools')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="tools-grid">
        <ResourceTile 
          title="University Program Planning" 
          to="/tools/university-program-planning"
        >
          Plan your university program based on your preferences. Select a program to view core subjects and details.
        </ResourceTile>
      </div>
    </div>
  )
}

export default Tools

