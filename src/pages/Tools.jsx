import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'
import './Tools.css'

function Tools() {
  const displayText = useDecodingText('Tools')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="tools-grid">
        {/* Tools will be added here */}
      </div>
    </div>
  )
}

export default Tools

