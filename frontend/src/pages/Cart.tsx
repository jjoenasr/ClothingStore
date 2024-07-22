import React from 'react'
import { useStore } from '../contexts/StoreContext';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { state, cartTotalItems, cartTotalPrice, removeFromCart } = useStore();
  const cart = state.cart
  return (
    <div className="flex flex-col">
      <div className="w-full md:w-2/3 mb-4 md:mb-0">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <Link to="/store" className="btn-dark inline-block mb-4">
                  &#x2190; Continue Shopping
              </Link>
              <div className='flex items-center justify-between'>
                <h5 className='font-bold'>
                    Total Items: {cartTotalItems()}
                </h5>
                <h5 className='font-bold'>
                    Total Price: ${cartTotalPrice().toFixed(2)}
                </h5>
                <div>
                {cartTotalItems() !== 0 && (
                    <Link to="/checkout" className="btn-success">
                        Checkout &#x2192;
                    </Link>
                )}
                </div>
              </div>
          </div>
      </div>

      <div className="w-full md:w-2/3">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex items-stretch mb-3 pb-3 border-b">
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 2 }}>
                        <strong>Item</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                        <strong>Size</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                        <strong>Price</strong>
                    </div>
                    <div style={{ flex: 2 }}>
                        <strong>Quantity</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                        <strong>Total</strong>
                    </div>
                    <div style={{ flex: 1 }}></div>
              </div>
              {cart.length > 0 ? (
                  cart.map((item, index) => (
                      <CartItem key={index} item={item} removeFromCart={removeFromCart} />
                  ))
              ) : (
                  <div className="text-center">You don't have any products in your cart :(</div>
              )}
          </div>
      </div>
</div>
  )
}

export default Cart
