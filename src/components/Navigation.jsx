import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isArrowVisible, setIsArrowVisible] = useState(false)
  const navRef = useRef(null)
  const linkRefs = useRef([])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleNavMouseEnter = () => {
    setIsArrowVisible(true)
  }

  const handleNavMouseLeave = () => {
    setIsArrowVisible(false)
    setHoveredIndex(null)
  }

  const handleLinkMouseEnter = (index) => {
    setHoveredIndex(index)
  }

  const handleLinkMouseLeave = () => {
    // Don't clear hoveredIndex here, let it persist until mouse leaves nav
  }

  const getArrowPosition = () => {
    if (hoveredIndex === null || !linkRefs.current[hoveredIndex] || !navRef.current) {
      return { top: 0 }
    }
    const linkRect = linkRefs.current[hoveredIndex].getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()
    return {
      top: linkRect.top - navRect.top + linkRect.height / 2
    }
  }

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={isOpen ? 'hamburger open' : 'hamburger'}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      {isOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      <nav 
        className={`navigation ${isOpen ? 'open' : ''}`}
        ref={navRef}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <div 
          className={`nav-arrow ${isArrowVisible && hoveredIndex !== null ? 'visible' : ''}`}
          style={getArrowPosition()}
        />
        <div className="nav-header">
          <h2 className="nav-title">
            <span className="nav-title-line">Hayden</span>
            <span className="nav-title-line">Seymour</span>
          </h2>
        </div>
        <ul className="nav-list">
          <li 
            ref={(el) => (linkRefs.current[0] = el)}
            onMouseEnter={() => handleLinkMouseEnter(0)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[1] = el)}
            onMouseEnter={() => handleLinkMouseEnter(1)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[2] = el)}
            onMouseEnter={() => handleLinkMouseEnter(2)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              Portfolio
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[3] = el)}
            onMouseEnter={() => handleLinkMouseEnter(3)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/work" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              Work
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[4] = el)}
            onMouseEnter={() => handleLinkMouseEnter(4)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/tools" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              Tools
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[5] = el)}
            onMouseEnter={() => handleLinkMouseEnter(5)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/resources" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              Resources
            </NavLink>
          </li>
        </ul>
        <div className="nav-social">
          <a href="https://x.com/0xHayd3n" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/hayden-seymour/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://farcaster.xyz/0xhayd3n.eth" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Farcaster">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 22 L4 15.5 L5.5 15.5 L5 22 Z"/>
              <line x1="4.75" y1="15.5" x2="4.75" y2="9"/>
              <path d="M19.25 22 L19.75 15.5 L21.25 15.5 L20.75 22 Z"/>
              <line x1="20.5" y1="15.5" x2="20.5" y2="9"/>
              <line x1="3.5" y1="9" x2="20.5" y2="9"/>
              <line x1="3.5" y1="6" x2="20.5" y2="6"/>
              <path d="M5.5 9 A7 7 0 0 1 19.5 9" strokeWidth="1.5"/>
            </svg>
          </a>
          <a href="https://zora.co/@0xhayd3n" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Zora">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </a>
          <a href="https://github.com/0xHayd3n" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
        </div>
      </nav>
    </>
  )
}

export default Navigation

