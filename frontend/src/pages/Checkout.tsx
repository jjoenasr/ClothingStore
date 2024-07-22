import React from 'react'
import ShippingInfo from '../components/ShippingInfo'
import { Link } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext'
import OrderSummary from '../components/OrderSummary'

const Checkout = () => {
  const {state} = useStore()
  const items = state.cart
  return (
    <div className='flex flex-wrap'>
      <div className='w-full md:w-1/2'>
        <ShippingInfo />
      </div>
      <div className='w-full md:w-1/2'>
        <div className=''>
          <Link className="btn-dark mt-3" to="/cart">
            &#x2190; Back to Cart
          </Link>
          <h3 className='font-bold text-2xl my-3'>Order Summary</h3>
          <hr />
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  )
}

export default Checkout
