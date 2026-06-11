import { Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

/**
 * Wraps any route that requires authentication.
 * If user is not logged in → redirect to /login
 * If logged in → render children
 */
export default function ProtectedRoute({ children }) {
  const { state } = useCart()

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}
