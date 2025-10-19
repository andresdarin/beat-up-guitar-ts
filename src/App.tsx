
import { Guitar } from './components/Guitar.js'
import { Footer } from './components/Footer.js'
import { useCart } from './hooks/useCart.js'
import { Header } from './components/Header.js'
import { useEffect, useReducer } from 'react'
import { cartReducer, initialCartState } from './reducers/cart-reducer.js'


function App() {


  const [state, dispatch] = useReducer(cartReducer, initialCartState,)

  console.log('state', state)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])


  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map(guitar => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
            />
          ))}
        </div>
      </main>


      <Footer />

    </>
  )
}

export default App
