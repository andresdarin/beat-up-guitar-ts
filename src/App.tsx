
import { Guitar } from './components/Guitar.js'
import Header from './components/Header.js'
import { Footer } from './components/Footer.js'
import { useCart } from './hooks/useCart.js'
import { useState } from 'react'

function App() {

  const { guitars, cart, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, clearCart, isEmpty, cartTotal } = useCart()


  return (
    <>
      <Header
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map(guitar => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>


      <Footer />

    </>
  )
}

export default App
