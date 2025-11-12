import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
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
      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h2 className="nav-title">Hayden Seymour</h2>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/work" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/tools" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Tools
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Resources
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation

