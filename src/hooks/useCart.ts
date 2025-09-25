import { useEffect, useMemo, useState } from "react"
import { db } from '../data/db.js'
import type { Guitar, GuitarItem } from "../types/Guitar.js"

export const useCart = () => {

    const initialCart = (): GuitarItem[] => {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    }

    const [guitars, setGuitars] = useState<Guitar[]>([])
    const [cart, setCart] = useState<GuitarItem[]>(initialCart)

    const MAX_ITEMS = 10
    const MIN_ITEMS = 1

    useEffect(() => {
        setGuitars(db as Guitar[])
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const handleAddToCart = (item: Guitar) => {    //la inmutabilidad en react sirve para que react detecte los cambios en los estados y vuelva a renderizar los componentes
        const itemExists = cart.findIndex(cartItem => cartItem.id === item.id)

        if (itemExists >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            const newItem: GuitarItem = { ...item, quantity: 1 }
            setCart([...cart, newItem])
        }

    }

    const handleRemoveFromCart = (id: Guitar['id']) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const handleIncreaseQuantity = (id: Guitar['id']) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setCart(updatedCart)
    }

    const handleDecreaseQuantity = (id: Guitar['id']) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);



    return {
        guitars,
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

