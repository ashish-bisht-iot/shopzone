import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Login() {
  const { state, dispatch } = useCart()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  // If already logged in, redirect to checkout
  function handleGuestLogin() {
    dispatch({ type: 'LOGIN' })
    navigate('/checkout')
  }

  function handleSubmit() {
    if (!email || !password) return
    setLoading(true)
    
    // Simulate async auth check
    setTimeout(() => {
      dispatch({ type: 'LOGIN' })
      navigate('/checkout')
    }, 800)
  }

  return (
    <div className="page page-enter login-page">
      <div className="login-card">
        <h1>Sign In</h1>
        <p className="sub">
          Log in to access checkout and track your orders.
          <br />No account? Continue as a guest below.
        </p>

        {/* Email */}
        <div className="form-field" style={{ textAlign: 'left' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-field" style={{ textAlign: 'left' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%' }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>

        <div className="divider">or</div>

        {/* Guest Login — the key Phase 3 action */}
        <button className="btn-guest" onClick={handleGuestLogin}>
          Continue as Guest
        </button>
      </div>
    </div>
  )
}
