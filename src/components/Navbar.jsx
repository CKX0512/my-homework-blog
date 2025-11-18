import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📝</span>
          <span className="brand-text">我的博客</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              首页
            </Link>
          </li>
          <li>
            <Link 
              to="/create" 
              className={location.pathname === '/create' ? 'active' : ''}
            >
              写文章
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              关于
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

