import { Link } from 'react-router-dom'
import { useDecodingText } from '../hooks/useDecodingText'
import './Page.css'
import './Home.css'

function Home() {
  const displayText = useDecodingText("Welcome, I'm Hayden Seymour")

  const navTiles = [
    {
      title: 'About',
      description: 'My background, skills, and journey into web3.',
      to: '/about'
    },
    {
      title: 'Portfolio',
      description: 'A showcase of my work and contributions.',
      to: '/portfolio'
    },
    {
      title: 'Projects',
      description: 'Current and past projects I\'ve been involved in.',
      to: '/projects'
    },
    {
      title: 'Tools',
      description: 'Software and resources I use daily.',
      to: '/tools'
    },
    {
      title: 'Resources',
      description: 'Curated content worth exploring.',
      to: '/resources'
    }
  ]

  return (
    <div className="page">
      <h1 className="page-title">{displayText}</h1>
      
      <div className="home-intro">
        <p>
          I'm a business graduate with a passion for creating and learning. My curiosity drives me to constantly explore new technologies—particularly in the web3 space—and find innovative ways to apply them within traditional industries. Whether it's building decentralised solutions or bridging the gap between legacy systems and blockchain, I'm always looking for the next challenge.
        </p>
      </div>

      <div className="home-nav-grid">
        {navTiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="home-nav-tile">
            <h3 className="home-nav-tile-title">{tile.title}</h3>
            <p className="home-nav-tile-desc">{tile.description}</p>
          </Link>
        ))}
      </div>

      <Link to="/meeting" className="home-meeting-cta">
        <div className="home-meeting-content">
          <h3 className="home-meeting-title">Book a Meeting</h3>
          <p className="home-meeting-desc">
            Interested in connecting? I'm open to conversations around:
          </p>
          <ul className="home-meeting-list">
            <li>Employment opportunities</li>
            <li>Venture & collaboration proposals</li>
            <li>Web3 consulting & advisory</li>
            <li>Partnership discussions</li>
            <li>General networking</li>
          </ul>
        </div>
        <span className="home-meeting-arrow">→</span>
      </Link>
    </div>
  )
}

export default Home

