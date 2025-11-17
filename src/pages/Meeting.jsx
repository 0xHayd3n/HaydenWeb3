import { useDecodingText } from '../hooks/useDecodingText'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Page.css'
import './Meeting.css'

function Meeting() {
  const displayText = useDecodingText('Book a Meeting')
  const [widgetRef, widgetVisible] = useScrollAnimation()

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      <div className="page-content">
        <div 
          className={`cal-embed-container ${widgetVisible ? 'fade-in-visible' : 'fade-in'}`}
          ref={widgetRef}
        >
          <iframe
            src="https://cal.com/0xhayd3n?embed=true&theme=light"
            className="cal-iframe"
            title="Book a meeting with Hayden"
            frameBorder="0"
            allow="camera; microphone; geolocation; encrypted-media"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Meeting

