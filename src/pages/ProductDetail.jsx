import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded]     = useState(false)

  useEffect(() => {
    setLoading(true)
    setAdded(false)

    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        navigate('/shop')
      })
  }, [id, navigate])

  function handleAddToCart() {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    setAdded(true)
    // Reset button label after 2s
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="page">
        <div className="loader">
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
        </div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="page page-enter">
      <div className="container">
        <div className="product-detail">
          {/* Back button */}
          <button className="back-btn" onClick={() => navigate('/shop')}>
            ← Back to Shop
          </button>

          <div className="detail-grid">
            {/* Image */}
            <div className="detail-img-wrap">
              <img src={product.images?.[0] || product.thumbnail} alt={product.title} />
            </div>

            {/* Info */}
            <div className="detail-info">
              <div className="detail-brand">{product.brand || product.category}</div>

              <h1 className="detail-title">{product.title}</h1>

              <div className="detail-price-row">
                <span className="detail-price">₹{product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="detail-discount">
                    -{product.discountPercentage.toFixed(1)}% OFF
                  </span>
                )}
              </div>

              <p className="detail-desc">{product.description}</p>

              {/* Meta grid */}
              <div className="detail-meta">
                <div>
                  <div className="meta-item-label">Rating</div>
                  <div className="meta-item-value">★ {product.rating}</div>
                </div>
                <div>
                  <div className="meta-item-label">In Stock</div>
                  <div className="meta-item-value">{product.stock} units</div>
                </div>
                <div>
                  <div className="meta-item-label">Category</div>
                  <div className="meta-item-value">{product.category}</div>
                </div>
                <div>
                  <div className="meta-item-label">SKU</div>
                  <div className="meta-item-value">#{product.id.toString().padStart(4, '0')}</div>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                className={`btn-add-cart ₹{added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
