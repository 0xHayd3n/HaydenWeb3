import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'

function Tools() {
  const displayText = useDecodingText('Tools')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="page-content">
        <p>Base blockchain tools and projects.</p>
      </div>
    </div>
  )
}

export default Tools

