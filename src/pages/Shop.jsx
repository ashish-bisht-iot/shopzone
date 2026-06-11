import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const FILTER_CATEGORIES = [
  { label: 'All',         value: 'all' },
  { label: '💄 Beauty',   value: 'beauty' },
  { label: '👗 Fashion',  value: 'womens-dresses' },
  { label: '📱 Tech',     value: 'smartphones' },
  { label: '⌚ Watches',  value: 'mens-watches' },
  { label: '👟 Footwear', value: 'mens-shoes' },
  { label: '🏠 Home',     value: 'furniture' },
  { label: '💍 Jewellery',value: 'womens-jewellery' },
]

const BADGE_MAP = {
  smartphones: 'TECH',
  laptops: 'TECH',
  beauty: 'NEW',
  fragrances: 'NEW',
  'mens-watches': 'TRENDING',
  'womens-watches': 'TRENDING',
  'womens-jewellery': 'LIMITED',
  'womens-dresses': 'TRENDING',
}

const BADGE_CLASS = {
  NEW: 'badge-new',
  TRENDING: 'badge-trending',
  TECH: 'badge-tech',
  LIMITED: 'badge-limited',
  SALE: 'badge-sale',
}

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [wishlist, setWishlist]  = useState([])
  const navigate = useNavigate()
  const { dispatch } = useCart()

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(r => { if (!r.ok) throw new Error('Failed to fetch'); return r.json() })
      .then(d => { setProducts(d.products); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return products
    return products.filter(p => p.category === activeFilter)
  }, [products, activeFilter])

  function toggleWishlist(e, id) {
    e.stopPropagation()
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  function quickAdd(e, product) {
    e.stopPropagation()
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  if (loading) return (
    <div className="page">
      <div className="loader">
        <div className="loader-dot" /><div className="loader-dot" /><div className="loader-dot" />
      </div>
    </div>
  )

  if (error) return (
    <div className="page">
      <div className="container" style={{ paddingTop: 60 }}>
        <p style={{ color: 'var(--accent2)' }}>Error: {error}</p>
      </div>
    </div>
  )

  return (
    <div className="page page-enter">
      <div className="container">

        {/* Header */}
        <div className="shop-header">
          <div>
            <h1>Curated Collection</h1>
            <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 13 }}>
              {filtered.length} products {activeFilter !== 'all' ? `in ${activeFilter}` : 'across all categories'}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-bar">
          {FILTER_CATEGORIES.map(f => (
            <button
              key={f.value}
              className={`filter-pill ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="product-grid">
          {filtered.map(product => {
            const badge = BADGE_MAP[product.category]
            const wishlisted = wishlist.includes(product.id)
            return (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/product/${product.id}`)}
              >
                {badge && (
                  <span className={`card-badge ${BADGE_CLASS[badge]}`}>{badge}</span>
                )}

                <button
                  className={`card-wishlist ${wishlisted ? 'active' : ''}`}
                  onClick={e => toggleWishlist(e, product.id)}
                  title="Wishlist"
                >
                  {wishlisted ? '❤️' : '🤍'}
                </button>

                <div className="card-img">
                  <img src={product.thumbnail} alt={product.title} loading="lazy" />
                  <button className="card-quick-add" onClick={e => quickAdd(e, product)}>
                    + Add to Cart
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-category">{product.category}</div>
                  <div className="card-title">{product.title}</div>
                  <div className="card-footer">
                    <span className="card-price">₹{product.price}</span>
                    <span className="card-rating">⭐ {product.rating}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            No products found in this category.
          </div>
        )}

      </div>
    </div>
  )
}