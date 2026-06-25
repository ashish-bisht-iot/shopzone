# ShopZone

> A modern, fully responsive E-Commerce Single Page Application built with React, Vite, and React Router v6. Features global cart state, mock authentication, protected routes, dark/light theme toggle, and a premium forest-green design aesthetic.

![ShopZone Banner](./screenshots/hero.png)

---

## Links

| | |
|---|---|
| **Live Demo** | [shopzone-ashy.vercel.app](https://shopzone-ashy.vercel.app) |
| **Repository** | [github.com/ashish-bisht-iot/shopzone](https://github.com/ashish-bisht-iot/shopzone) |
---

## Screenshots

### Home Page
![Home Page](./screenshots/home.png)

### Shop — Product Grid with Filters
![Shop Page](./screenshots/shop.png)

### Product Detail
![Product Detail](./screenshots/product-detail.png)

### Cart
![Cart Page](./screenshots/cart.png)

### Login & Guest Auth
![Login Page](./screenshots/login.png)

### Light Mode
![Light Mode](./screenshots/light-mode.png)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool & dev server |
| React Router DOM v6 | Client-side routing |
| Context API + useReducer | Global state management |
| localStorage | Cart & auth persistence |
| DummyJSON API | Product data source |
| CSS Variables | Theming system |

---

## Project Structure

```
shopzone/
├── public/
├── src/
│   ├── context/
│   │   └── CartContext.jsx       # Global cart + auth state
│   ├── components/
│   │   ├── Navbar.jsx            # Persistent nav with cart badge + theme toggle
│   │   └── ProtectedRoute.jsx    # Redirects unauthenticated users
│   ├── pages/
│   │   ├── Home.jsx              # Hero, categories, featured, testimonials
│   │   ├── Shop.jsx              # Product grid with category filters
│   │   ├── ProductDetail.jsx     # Single product view with add to cart
│   │   ├── Cart.jsx              # Cart items, qty controls, order summary
│   │   ├── Contact.jsx           # Static contact form
│   │   ├── Login.jsx             # Mock auth with guest login
│   │   └── Checkout.jsx          # Protected checkout page
│   ├── App.jsx                   # Route configuration
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles + design tokens
├── vercel.json                   # SPA routing fix for Vercel
├── Prompts.md                    # AI debugging log
└── README.md
```

---

## Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Home | No |
| `/shop` | Product catalog | No |
| `/product/:id` | Product detail | No |
| `/cart` | Shopping cart | No |
| `/contact` | Contact form | No |
| `/login` | Login / Guest auth | No |
| `/checkout` | Checkout | Yes — redirects to `/login` |

---
