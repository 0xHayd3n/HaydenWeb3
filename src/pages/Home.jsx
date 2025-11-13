import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'

function Home() {
  const displayText = useDecodingText("Welcome, I'm Hayden Seymour")

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
    </div>
  )
}

export default Home

