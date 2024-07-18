import React from 'react'
import { useStore } from '../contexts/StoreContext';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { state, cartTotalItems, cartTotalPrice, removeFromCart } = useStore();
  const cart = state.cart
  return (
    <div className="flex flex-col">
      <div className="w-full mb-4 md:mb-0 md:pr-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <Link to="/store" className="btn-dark inline-block mb-4">
                  &#x2190; Continue Shopping
              </Link>
              <table className="table table-fixed">
                  <tbody>
                      <tr>
                          <th>
                              <h5>
                                  Items: <strong>{cartTotalItems()}</strong>
                              </h5>
                          </th>
                          <th>
                              <h5>
                                  Total: <strong>${cartTotalPrice()}</strong>
                              </h5>
                          </th>
                          <th className="text-right">
                              {cartTotalItems() !== 0 && (
                                  <Link to="/checkout" className="btn-success">
                                      Checkout
                                  </Link>
                              )}
                          </th>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>

      <div className="w-full md:w-2/3">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex items-stretch mb-3 pb-3 border-b">
                    <div style={{ flex: 2 }}></div>
                    <div style={{ flex: 2 }}>
                        <strong>Item</strong>
                    </div>
                    <div style={{ flex: 2 }}>
                        <strong>Size</strong>
                    </div>
                    <div style={{ flex: 2 }}>
                        <strong>Price</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                        <strong>Quantity</strong>
                    </div>
                    <div style={{ flex: 1 }}>
                        <strong>Total</strong>
                    </div>
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
