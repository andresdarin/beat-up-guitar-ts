import { db } from "../data/db";
import type { Guitar, GuitarItem } from "../types/Guitar";
import type { CartItem } from "../types/Header";

const MAX_ITEMS = 10
const MIN_ITEMS = 1

export type CartActions =
    | { type: 'ADD_TO_CART', payload: { item: Guitar } }
    | { type: 'REMOVE_FROM_CART', payload: { id: Guitar['id'] } }
    | { type: 'INCREASE_QUANTITY', payload: { id: Guitar['id'] } }
    | { type: 'DECREASE_QUANTITY', payload: { id: Guitar['id'] } }
    | { type: 'CLEAR_CART' }


export const initialCart = (): GuitarItem[] => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
}

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

export const initialCartState: CartState = {
    data: db,
    cart: initialCart()
}

export const cartReducer = (
    state: CartState = initialCartState,
    action: CartActions
) => {
    if (action.type === 'ADD_TO_CART') {
        const itemExists = state.cart.find(cartItem => cartItem.id === action.payload.item.id)
        let updatedCart: CartItem[] = []
        if (itemExists) {
            updatedCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.item.id) {
                    if (cartItem.quantity < MAX_ITEMS) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 }
                    }
                    else {
                        return cartItem
                    }
                }
                else {
                    return cartItem
                }
            })

        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }
        return { ...state, cart: updatedCart }
    }
    else if (action.type === 'REMOVE_FROM_CART') {
        const updatedCart = state.cart.filter(cartItem => cartItem.id !== action.payload.id)
        return { ...state, cart: updatedCart }
    }
    else if (action.type === 'INCREASE_QUANTITY') {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        return { ...state, cart: updatedCart }
    }
    else if (action.type === 'DECREASE_QUANTITY') {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })
        return { ...state, cart: updatedCart }
    }
    else if (action.type === 'CLEAR_CART') {
        return { ...state, cart: [] }
    }

    return state
}