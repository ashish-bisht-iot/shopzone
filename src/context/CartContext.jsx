import { createContext, useContext, useReducer, useEffect } from 'react'

// ── Context ──────────────────────────────────────────────────────────────────
export const CartContext = createContext(null)

// ── Initial State (hydrate from localStorage) ────────────────────────────────
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('shopzone_cart') || '[]'),
  isLoggedIn: false,
}

// ── Reducer ──────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_TO_CART': {
      const existing = state.cartItems.find(i => i.id === action.payload.id)
      if (existing) {
        // Item already in cart — increment quantity
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      // New item — push with quantity: 1
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.id !== action.payload),
      }
    }

    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(i => i.id !== action.payload.id),
        }
      }
      return {
        ...state,
        cartItems: state.cartItems.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.qty }
            : i
        ),
      }
    }

    case 'CLEAR_CART': {
      return { ...state, cartItems: [] }
    }

    case 'LOGIN': {
      return { ...state, isLoggedIn: true }
    }

    case 'LOGOUT': {
      return { ...state, isLoggedIn: false }
    }

    default:
      return state
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('shopzone_cart', JSON.stringify(state.cartItems))
  }, [state.cartItems])

  // Persist auth state
  useEffect(() => {
    localStorage.setItem('shopzone_auth', JSON.stringify(state.isLoggedIn))
  }, [state.isLoggedIn])

  // Derived values
  const totalItems = state.cartItems.reduce((acc, i) => acc + i.quantity, 0)
  const totalPrice = state.cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
