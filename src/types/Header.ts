export type CartItem = {
    id: number
    name: string
    image: string
    price: number
    quantity: number
}

export type HeaderProps = {
    cart: CartItem[]
    handleRemoveFromCart: (id: number) => void
    handleIncreaseQuantity: (id: number) => void
    handleDecreaseQuantity: (id: number) => void
    clearCart: () => void
    isEmpty: boolean
    cartTotal: number
}
