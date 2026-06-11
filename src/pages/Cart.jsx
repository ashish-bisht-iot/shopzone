import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { state, dispatch, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()
  const { cartItems } = state

  function updateQty(id, qty) {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  if (cartItems.length === 0) {
    return (
      <div className="page page-enter">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
              Browse our catalog and add something you like.
            </p>
            <button className="btn-primary" onClick={() => navigate('/shop')}>
              Go to Shop →
            </button>
          </div>
        </div>
      </div>
    )
  }

  const shipping = totalPrice > 100 ? 0 : 9.99
  const tax      = totalPrice * 0.08

  return (
    <div className="page page-enter">
      <div className="container">
        <div className="cart-page">
          <h1>Cart <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({totalItems})</span></h1>

          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  {/* Thumbnail */}
                  <img
                    className="cart-item-img"
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  {/* Info */}
                  <div>
                    <div className="cart-item-name">{item.title}</div>
                    <div className="cart-item-cat">{item.category}</div>
                    <div className="cart-qty-row">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div>
                    <div className="cart-item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹{shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{(totalPrice + shipping + tax).toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout →
              </button>

              <button
                className="btn-ghost"
                style={{ width: '100%', textAlign: 'center', marginTop: 16 }}
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
