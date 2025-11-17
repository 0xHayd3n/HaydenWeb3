import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('navCollapsed')
    return saved ? JSON.parse(saved) : false
  })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState(null)
  const [isArrowVisible, setIsArrowVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipText, setTooltipText] = useState('')
  const navRef = useRef(null)
  const linkRefs = useRef([])
  const socialRefs = useRef([])

  const pageNames = ['Home', 'About', 'Portfolio', 'Projects', 'Tools', 'Resources', 'Book a Meeting']
  const socialNames = ['Twitter', 'LinkedIn', 'Farcaster', 'Zora', 'GitHub', 'Substack']

  // Save collapsed state to localStorage and update body class
  useEffect(() => {
    localStorage.setItem('navCollapsed', JSON.stringify(isCollapsed))
    // Update body class for CSS adjustments
    if (isCollapsed) {
      document.body.classList.add('nav-collapsed')
    } else {
      document.body.classList.remove('nav-collapsed')
    }
  }, [isCollapsed])

  // Update tooltip position for social icons when expanded
  useEffect(() => {
    if (!isCollapsed && hoveredSocialIndex !== null && socialRefs.current[hoveredSocialIndex]) {
      const socialRect = socialRefs.current[hoveredSocialIndex].getBoundingClientRect()
      setTooltipPosition({
        x: socialRect.right + 10,
        y: socialRect.top + socialRect.height / 2
      })
    }
  }, [hoveredSocialIndex, isCollapsed])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

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
    setHoveredSocialIndex(null)
    setTooltipText('')
  }

  const handleLinkMouseEnter = (index, e) => {
    setHoveredIndex(index)
    if (isCollapsed) {
      setTooltipText(pageNames[index])
      updateTooltipPosition(e)
    }
  }

  const handleLinkMouseMove = (e) => {
    if (isCollapsed && hoveredIndex !== null) {
      updateTooltipPosition(e)
    }
  }

  const handleLinkMouseLeave = () => {
    // Don't clear hoveredIndex here, let it persist until mouse leaves nav
    if (isCollapsed) {
      setTooltipText('')
    }
  }

  const updateTooltipPosition = (e) => {
    setTooltipPosition({
      x: e.clientX + 10,
      y: e.clientY - 10
    })
  }

  const getArrowPosition = () => {
    // Check if hovering over a nav link
    if (hoveredIndex !== null && linkRefs.current[hoveredIndex] && navRef.current) {
      const linkRect = linkRefs.current[hoveredIndex].getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      return {
        top: linkRect.top - navRect.top + linkRect.height / 2
      }
    }
    // Check if hovering over a social icon
    if (hoveredSocialIndex !== null && socialRefs.current[hoveredSocialIndex] && navRef.current) {
      const socialRect = socialRefs.current[hoveredSocialIndex].getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      return {
        top: socialRect.top - navRect.top + socialRect.height / 2
      }
    }
    return { top: 0 }
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
      {tooltipText && (
        <div 
          className={`nav-tooltip ${isCollapsed ? 'nav-tooltip-follow' : 'nav-tooltip-expanded'}`}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`
          }}
        >
          {tooltipText}
        </div>
      )}
      <nav 
        className={`navigation ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        ref={navRef}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <button 
          className="nav-collapse-toggle"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isCollapsed ? (
              <path d="M9 18l6-6-6-6"/>
            ) : (
              <path d="M15 18l-6-6 6-6"/>
            )}
          </svg>
        </button>
        <div 
          className={`nav-arrow ${isArrowVisible && (hoveredIndex !== null || hoveredSocialIndex !== null) && !isCollapsed ? 'visible' : ''}`}
          style={getArrowPosition()}
        />
        <div className="nav-header">
          <h2 className="nav-title">
            <span className="nav-title-line">Hayden</span>
            <span className="nav-title-line">Seymour</span>
          </h2>
          <h2 className="nav-title-collapsed">HS</h2>
        </div>
        <ul className="nav-list">
          <li 
            ref={(el) => (linkRefs.current[0] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(0, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <path d="M9 22V12h6v10"/>
                </svg>
              </span>
              <span className="nav-link-text">Home</span>
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[1] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(1, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <span className="nav-link-text">About</span>
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[2] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(2, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </span>
              <span className="nav-link-text">Portfolio</span>
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[3] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(3, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/projects" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6"/>
                  <path d="M16 13H8"/>
                  <path d="M16 17H8"/>
                  <path d="M10 9H8"/>
                </svg>
              </span>
              <span className="nav-link-text">Projects</span>
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[4] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(4, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/tools" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </span>
              <span className="nav-link-text">Tools</span>
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[5] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(5, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/resources" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </span>
              <span className="nav-link-text">Resources</span>
            </NavLink>
          </li>
          <li 
            ref={(el) => (linkRefs.current[6] = el)}
            onMouseEnter={(e) => handleLinkMouseEnter(6, e)}
            onMouseMove={handleLinkMouseMove}
            onMouseLeave={handleLinkMouseLeave}
          >
            <NavLink 
              to="/meeting" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              onClick={closeMenu}
            >
              <span className="nav-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
              <span className="nav-link-text">Book a Meeting</span>
            </NavLink>
          </li>
        </ul>
        <div className="nav-social">
          <a 
            ref={(el) => (socialRefs.current[0] = el)}
            href="https://x.com/0xHayd3n" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="Twitter"
            onMouseEnter={(e) => {
              setTooltipText(socialNames[0])
              if (isCollapsed) {
                updateTooltipPosition(e)
              } else {
                setHoveredSocialIndex(0)
              }
            }}
            onMouseMove={(e) => {
              if (isCollapsed) {
                updateTooltipPosition(e)
              }
            }}
            onMouseLeave={() => {
              setTooltipText('')
              setHoveredSocialIndex(null)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
          </a>
          <a 
            ref={(el) => (socialRefs.current[1] = el)}
            href="https://www.linkedin.com/in/hayden-seymour/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="LinkedIn"
            onMouseEnter={(e) => {
              setTooltipText(socialNames[1])
              if (isCollapsed) {
                updateTooltipPosition(e)
              } else {
                setHoveredSocialIndex(1)
              }
            }}
            onMouseMove={(e) => {
              if (isCollapsed) {
                updateTooltipPosition(e)
              }
            }}
            onMouseLeave={() => {
              setTooltipText('')
              setHoveredSocialIndex(null)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a 
            ref={(el) => (socialRefs.current[2] = el)}
            href="https://farcaster.xyz/0xhayd3n.eth" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="Farcaster"
            onMouseEnter={(e) => {
              setTooltipText(socialNames[2])
              if (isCollapsed) {
                updateTooltipPosition(e)
              } else {
                setHoveredSocialIndex(2)
              }
            }}
            onMouseMove={(e) => {
              if (isCollapsed) {
                updateTooltipPosition(e)
              }
            }}
            onMouseLeave={() => {
              setTooltipText('')
              setHoveredSocialIndex(null)
            }}
          >
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
          <a 
            ref={(el) => (socialRefs.current[3] = el)}
            href="https://zora.co/@0xhayd3n" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="Zora"
            onMouseEnter={(e) => {
              setTooltipText(socialNames[3])
              if (isCollapsed) {
                updateTooltipPosition(e)
              } else {
                setHoveredSocialIndex(3)
              }
            }}
            onMouseMove={(e) => {
              if (isCollapsed) {
                updateTooltipPosition(e)
              }
            }}
            onMouseLeave={() => {
              setTooltipText('')
              setHoveredSocialIndex(null)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </a>
          <a 
            ref={(el) => (socialRefs.current[4] = el)}
            href="https://github.com/0xHayd3n" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="GitHub"
            onMouseEnter={(e) => {
              setTooltipText(socialNames[4])
              if (isCollapsed) {
                updateTooltipPosition(e)
              } else {
                setHoveredSocialIndex(4)
              }
            }}
            onMouseMove={(e) => {
              if (isCollapsed) {
                updateTooltipPosition(e)
              }
            }}
            onMouseLeave={() => {
              setTooltipText('')
              setHoveredSocialIndex(null)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
          <a 
            ref={(el) => (socialRefs.current[5] = el)}
            href="https://substack.com/@0xhayd3n" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon" 
            aria-label="Substack"
            onMouseEnter={(e) => {
              setTooltipText(socialNames[5])
              if (isCollapsed) {
                updateTooltipPosition(e)
              } else {
                setHoveredSocialIndex(5)
              }
            }}
            onMouseMove={(e) => {
              if (isCollapsed) {
                updateTooltipPosition(e)
              }
            }}
            onMouseLeave={() => {
              setTooltipText('')
              setHoveredSocialIndex(null)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </a>
        </div>
      </nav>
    </>
  )
}

export default Navigation

