import { Link } from 'react-router-dom'
import './ResourceTile.css'

function ResourceTile({ title, to, href, children }) {
  const content = (
    <div className="resource-tile">
      <h3 className="resource-tile-title">{title}</h3>
      {children && <div className="resource-tile-content">{children}</div>}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="resource-tile-link">
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className="resource-tile-link">
        {content}
      </Link>
    )
  }

  return content
}

export default ResourceTile

