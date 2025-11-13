import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'

function About() {
  const displayText = useDecodingText('About')

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="page-content">
        <p>Building tools on Base.</p>
      </div>
    </div>
  )
}

export default About

