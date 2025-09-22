import { useEffect, useMemo, useState } from "react"
import { db } from '../data/db.js'




export const useCart = () => {

    const initialCart = () => {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    }

    const [guitars, setGuitars] = useState([])
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 10
    const MIN_ITEMS = 1

    useEffect(() => {
        setGuitars(db)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const handleAddToCart = (item) => {    //la inmutabilidad en react sirve para que react detecte los cambios en los estados y vuelva a renderizar los componentes
        const itemExists = cart.findIndex(cartItem => cartItem.id === item.id)

        if (itemExists >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    const handleRemoveFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setCart(updatedCart)
    }

    const handleDecreaseQuantity = (id) => {
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

