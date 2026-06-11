import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home        from './pages/Home'
import Shop        from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart        from './pages/Cart'
import Contact     from './pages/Contact'
import Login       from './pages/Login'
import Checkout    from './pages/Checkout'

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar persists across ALL routes */}
      <Navbar />

      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/shop"      element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart"      element={<Cart />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/login"     element={<Login />} />

        {/* Protected: redirects to /login if not authenticated */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
