import React from 'react'
import ShippingInfo from '../components/ShippingInfo'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext'
import OrderSummary from '../components/OrderSummary'
import { checkout } from '../services/storeServices'
import { toast } from 'react-toastify'
import { ShippingAddress } from '../../typings'

const Checkout = () => {
  const {state, clearCart} = useStore()
  const items = state.cart
  const navigate = useNavigate()

  const submitOrder = async(shippingAddress:ShippingAddress) => {
    const myItems = items.map(item => ({
      product: item.product.id,
      quantity: item.quantity,
      size: item.size
    }))

    try {
      console.log(state.token)
      await checkout(myItems, shippingAddress)
      clearCart()
      navigate('/store')
      toast.success('Your order was succesfully processed !!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });

    } catch(error:any){
      console.error("Error: ", error)
    }

  }
  return (
    <div className='flex flex-wrap'>
      <div className='w-full md:w-1/2 mx-1'>
        <Link className="btn-dark mt-3" to="/cart">
          &#x2190; Back to Cart
        </Link>
        <ShippingInfo onSubmit={submitOrder} />
      </div>
      <div className='w-full max-w-xl md:w-1/2'>
        <div className=''>
          <h3 className='font-bold text-2xl my-3'>Order Summary</h3>
          <hr />
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  )
}

export default Checkout
