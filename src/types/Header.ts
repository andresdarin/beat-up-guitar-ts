import type { CartActions } from "../reducers/cart-reducer"

export type CartItem = {
    id: number
    name: string
    image: string
    price: number
    quantity: number
}

export type HeaderProps = {
    cart: CartItem[]
    dispatch: (action: CartActions) => void
}
