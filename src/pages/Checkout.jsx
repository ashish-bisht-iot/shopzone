import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { state, dispatch, totalPrice } = useCart()
  const navigate = useNavigate()
  const { cartItems } = state

  const shipping = totalPrice > 100 ? 0 : 9.99
  const tax      = totalPrice * 0.08
  const total    = (totalPrice + shipping + tax).toFixed(2)

  function handlePlaceOrder() {
    dispatch({ type: 'CLEAR_CART' })
    alert(`🎉 Order placed! Total charged: ₹{total}`)
    navigate('/')
  }

  return (
    <div className="page page-enter">
      <div className="container">
        <div className="checkout-page">
          <h1>Checkout</h1>

          {/* Shipping Details */}
          <div className="form-field">
            <label>Full Name</label>
            <input type="text" placeholder="Ashish Bisht" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" placeholder="ashish@example.com" />
          </div>
          <div className="form-field">
            <label>Shipping Address</label>
            <input type="text" placeholder="123 Main Street, New Delhi" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-field">
              <label>City</label>
              <input type="text" placeholder="New Delhi" />
            </div>
            <div className="form-field">
              <label>PIN Code</label>
              <input type="text" placeholder="110001" />
            </div>
          </div>

          {/* Payment */}
          <div className="form-field" style={{ marginTop: 8 }}>
            <label>Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-field">
              <label>Expiry</label>
              <input type="text" placeholder="MM / YY" maxLength={7} />
            </div>
            <div className="form-field">
              <label>CVV</label>
              <input type="text" placeholder="123" maxLength={3} />
            </div>
          </div>

          {/* Order items summary */}
          <div style={{
            padding: '24px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            marginBottom: 24,
          }}>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
              Order Summary
            </p>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--muted)' }}>{item.title} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 18 }}>
              <span>Total</span>
              <span style={{ color: 'var(--accent)' }}>₹{total}</span>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', padding: '18px' }} onClick={handlePlaceOrder}>
            Place Order — ₹{total}
          </button>
        </div>
      </div>
    </div>
  )
}
