import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'

function Projects() {
  const displayText = useDecodingText('Projects')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="page-content">
        <p>Professional experience and case studies.</p>
      </div>
    </div>
  )
}

export default Projects

