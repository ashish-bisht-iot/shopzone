# Prompts.md — ShopZone

This file documents my AI-assisted debugging sessions during this project.

---

## Session 01 — Understanding React Router v6 Syntax
**Prompt:**
> "What is the difference between useNavigate() and the old useHistory() hook in React Router v6? Why can't I find useHistory in my imports?"

**Insight Gained:**
React Router v6 replaced `useHistory` with `useNavigate`. The new hook returns a function you call directly: `navigate('/shop')` instead of `history.push('/shop')`. Also, the `<Switch>` component is now `<Routes>`.

---

## Session 02 — useEffect Firing Twice on Mount
**Prompt:**
> "My useEffect fetch is running twice on page load and I'm getting two API calls. I only have one useEffect. Why?"

**Insight Gained:**
This is caused by `<React.StrictMode>` in `main.jsx`. In development, StrictMode intentionally mounts → unmounts → remounts components to expose side-effect bugs. It does NOT behave this way in production Vercel builds. The fix is to not panic — the API calls are expected in dev.

---

## Session 03 — Cart Duplicate Item Logic
**Prompt:**
> "When I click Add to Cart twice on the same product, I get two separate entries in my cart array instead of one entry with quantity: 2. How do I fix the reducer logic?"

**Insight Gained:**
Inside the `ADD_TO_CART` reducer case, I need to first check if the item already exists using `.find(i => i.id === action.payload.id)`. If it exists, use `.map()` to return a new array where that item's `quantity` is incremented. If it doesn't exist, spread the existing array and add the new item with `quantity: 1`.

---

## Session 04 — Vercel 404 on Route Refresh
**Prompt:**
> "My app works locally but when I deploy to Vercel and refresh the page on /product/5, I get a 404 error. Why?"

**Insight Gained:**
Vercel's servers try to find a physical file matching the URL path. Since React is a SPA with only one `index.html`, there is no actual file at `/product/5`. The fix is to add a `vercel.json` file with a rewrite rule that redirects all routes to `/index.html`, letting React Router handle the routing client-side.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Session 05 — useParams Not Updating on Navigation
**Prompt:**
> "I navigate from /product/1 to /product/2 but my ProductDetail page doesn't re-fetch. The title still shows the old product."

**Insight Gained:**
The `useEffect` that fetches product data needs `[id]` in its dependency array, where `id` comes from `useParams()`. Without this, the effect only runs once on mount, not when the URL param changes. Also added `setLoading(true)` at the top of the effect to reset state between fetches.

---

## Session 06 — NavLink Active Class Not Working
**Prompt:**
> "How do I make my Navbar links highlight when I'm on their page? My CSS .active class isn't applying."

**Insight Gained:**
React Router's `<NavLink>` component accepts a `className` prop as a function: `className={({ isActive }) => isActive ? 'active' : ''}`. For the home route `/`, I need to add the `end` prop to prevent it from matching all routes that start with `/`.

---

## Session 07 — localStorage Hydration Causing Stale State
**Prompt:**
> "I'm reading from localStorage in my initialState but after clearing the cart, on next refresh the old cart data still loads. The localStorage key isn't being cleared properly."

**Insight Gained:**
The `CLEAR_CART` reducer was updating React state correctly, but I forgot to add a `useEffect` that syncs the cart to `localStorage` whenever `state.cartItems` changes. Once I added `localStorage.setItem('shopzone_cart', JSON.stringify(state.cartItems))` inside a `useEffect([state.cartItems])`, the persistence worked correctly in both directions.

---
