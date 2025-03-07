import React from 'react'
import { useStore } from '../contexts/StoreContext';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { state, cartTotalItems, cartTotalPrice, removeFromCart } = useStore();
  const cart = state.cart
  return (
    <div className="flex flex-col pt-[96px] px-4 lg:px-10">
    <div className="w-full lg:w-2/3 mb-4">
        <div className="bg-white shadow-md rounded border p-4 md:p-8 mb-4">
            <Link to="/store" className="btn-dark inline-block mb-4">
                &#x2190; Continue Shopping
            </Link>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='space-y-2 sm:space-y-0'>
                <h5 className='font-bold'>
                    Total Items: {cartTotalItems()}
                </h5>
                <h5 className='font-bold'>
                    Total Price: ${cartTotalPrice().toFixed(2)}
                </h5>
              </div>
              <div>
              {cartTotalItems() !== 0 && (
                  <Link to="/checkout" className="btn-success text-sm w-full sm:w-auto text-center">
                      Checkout &#x2192;
                  </Link>
              )}
              </div>
            </div>
        </div>
    </div>

    <div className="w-full lg:w-2/3">
        <div className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-8 mb-4">
          <div className="hidden md:flex items-center justify-between text-center mb-3 pb-3 border-b text-gray-700 font-semibold">
              <div className="w-[120px]">Image</div>
              <div className="w-[200px]">Item</div>
              <div className="w-[100px]">Size</div>
              <div className="w-[100px]">Price</div>
              <div className="w-[150px]">Quantity</div>
              <div className="w-[100px]">Total</div>
              <div className="w-[80px]">Action</div>
          </div>
            
            {cart.length > 0 ? (
                cart.map((item, index) => (
                    <CartItem key={index} item={item} removeFromCart={removeFromCart} />
                ))
            ) : (
                <div className="text-center py-4 text-gray-500">You don&apos;t have any products in your cart</div>
            )}
        </div>
    </div>
  </div>
  )
}

export default Cart
