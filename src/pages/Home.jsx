import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const CATEGORIES = [
  { icon: '💄', name: 'Beauty',       value: 'beauty' },
  { icon: '👗', name: 'Fashion',      value: 'womens-dresses' },
  { icon: '📱', name: 'Tech',         value: 'smartphones' },
  { icon: '⌚', name: 'Watches',      value: 'mens-watches' },
  { icon: '👟', name: 'Footwear',     value: 'mens-shoes' },
  { icon: '💍', name: 'Jewellery',    value: 'womens-jewellery' },
]

const TESTIMONIALS = [
  { stars: '⭐⭐⭐⭐⭐', text: 'Amazing quality and fast delivery. ShopZone is now my go-to for everything online.', name: 'Priya S.', location: 'Mumbai', emoji: '👩' },
  { stars: '⭐⭐⭐⭐⭐', text: 'The product selection is incredible. Found exactly what I was looking for at a great price.', name: 'Rahul M.', location: 'Delhi', emoji: '👨' },
  { stars: '⭐⭐⭐⭐⭐', text: 'Smooth experience from browsing to checkout. The UI is clean and the cart works perfectly.', name: 'Anjali K.', location: 'Bangalore', emoji: '👩' },
]

const BADGES = ['NEW', 'TRENDING', 'SALE', '', 'NEW', '', 'TRENDING', '']
const BADGE_CLASS = { NEW: 'badge-new', TRENDING: 'badge-trending', SALE: 'badge-sale' }

export default function Home() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])

  const featuredRef     = useFadeIn()
  const categoriesRef   = useFadeIn()
  const promoRef        = useFadeIn()
  const testimonialsRef = useFadeIn()

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then(r => r.json())
      .then(d => setFeatured(d.products))
  }, [])

  const mainProduct = featured[0]
  const floatCards  = featured.slice(1, 4)

  return (
    <div className="page page-enter">
      <div className="container">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-eyebrow">🌿 New Season — Summer 2026</div>

            <h1 className="hero-title">
              Everything.<br />
              <span className="line2">One Place.</span>
            </h1>

            <p className="hero-sub">
              Discover fashion, beauty, tech, essentials,
              and more — curated for modern living.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate('/shop')}>
                Browse Catalog <span className="arrow">→</span>
              </button>
              <button className="btn-ghost" onClick={() => navigate('/contact')}>
                Contact Us
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-num">199</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏷️</div>
                <div className="stat-num">30+</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-num">4.5</div>
                <div className="stat-label">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Right collage */}
          <div className="hero-right">
            <div className="hero-bg-circle" />

            {mainProduct && (
              <div className="hero-main-card" onClick={() => navigate(`/product/${mainProduct.id}`)}>
                <img src={mainProduct.thumbnail} alt={mainProduct.title} />
                <div className="hero-main-card-body">
                  <div className="hero-main-card-title">{mainProduct.title}</div>
                  <div className="hero-main-card-price">₹{mainProduct.price}</div>
                </div>
              </div>
            )}

            {floatCards.map((p, i) => (
              <div
                key={p.id}
                className={`hero-float-card card-${i + 1}`}
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img className="float-img" src={p.thumbnail} alt={p.title} />
                <div>
                  <div className="float-name">{p.title.slice(0, 18)}…</div>
                  <div className="float-price">₹{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Shop by Category ──────────────────────────────── */}
        <section className="categories-section fade-in" ref={categoriesRef} style={{ paddingTop: 80 }}>
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <span className="section-link" onClick={() => navigate('/shop')}>View all →</span>
          </div>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <div
                key={cat.value}
                className="category-card"
                onClick={() => navigate('/shop')}
              >
                <div className="category-icon">{cat.icon}</div>
                <div className="category-name">{cat.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Products ──────────────────────────────── */}
        <section className="featured-section fade-in" ref={featuredRef}>
          <div className="section-header">
            <h2 className="section-title">Featured Essentials</h2>
            <span className="section-link" onClick={() => navigate('/shop')}>View all →</span>
          </div>

          <div className="featured-grid">
            {featured.map((product, idx) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/product/${product.id}`)}
              >
                {BADGES[idx] && (
                  <span className={`card-badge ${BADGE_CLASS[BADGES[idx]]}`}>{BADGES[idx]}</span>
                )}
                <span className="card-wishlist">🤍</span>

                <div className="card-img">
                  <img src={product.thumbnail} alt={product.title} loading="lazy" />
                  <button
                    className="card-quick-add"
                    onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
                  >
                    Quick View →
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
            ))}
          </div>
        </section>

        {/* ── Promo Banner ──────────────────────────────────── */}
        <div className="promo-banner fade-in" ref={promoRef}>
          <div>
            <div className="promo-label">🔥 Limited Time Offer</div>
            <div className="promo-title">Free Shipping<br />on Orders over ₹999</div>
            <p className="promo-sub">
              Shop from our curated collection and get your favourite
              products delivered to your doorstep — on us.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/shop')} style={{ flexShrink: 0 }}>
            Shop Now <span className="arrow">→</span>
          </button>
        </div>

        {/* ── Testimonials ──────────────────────────────────── */}
        <section className="testimonials-section fade-in" ref={testimonialsRef}>
          <div className="section-header">
            <h2 className="section-title">What Customers Say</h2>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">{t.stars}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.emoji}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}