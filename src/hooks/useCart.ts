import { useEffect, useMemo, useState } from "react"
import type { Guitar, GuitarItem } from "../types/Guitar.js"

export const useCart = () => {

    const initialCart = (): GuitarItem[] => {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    }

    const [cart, setCart] = useState<GuitarItem[]>(initialCart)







    const clearCart = () => {
        setCart([])
    }





    return {
        cart,
        clearCart
    }
}

