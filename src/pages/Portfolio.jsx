import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'

function Portfolio() {
  const displayText = useDecodingText('Portfolio')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="page-content">
        <p>Projects and work will be displayed here.</p>
      </div>
    </div>
  )
}

export default Portfolio

