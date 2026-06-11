import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [theme, setTheme] = useState(
    localStorage.getItem('shopzone_theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('shopzone_theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-logo">
          Shop<span>Zone</span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
            Login
            </NavLink>
            </li>
            <li>
              <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                <span className="toggle-track">
                  <span className="toggle-thumb" />
                  </span>
                  <span className="toggle-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                  </button>
                  </li>
          <li>
            <button className="cart-btn" onClick={() => navigate('/cart')}>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="cart-badge" key={totalItems}>
                  {totalItems}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

