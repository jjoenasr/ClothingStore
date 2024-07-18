import React from 'react'
import { useStore } from '../contexts/StoreContext'
import { Item } from '../../typings'
import { API_URL } from '../constants'

const OrderSummary = ({items}:{ items: Item[] }) => {
  const { cartTotalPrice, cartTotalItems } = useStore()
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div className="flex items-stretch pb-10 mb-5 border-b border-gray-200" key={index}>
            <div style={{ flex: 2 }}>
                {item.product.imageURL ? (
                    <img className="w-24" src={API_URL + item.product.imageURL} alt={item.product.name} />
                ) : (
                    <img className="w-24" src="/images/placeholder.png" alt={item.product.name} />
                )}
            </div>
            <div style={{ flex: 2 }}>
                <p>{item.product.name}</p>
            </div>
            <div style={{ flex: 1 }}>
                <p>x{item.quantity}</p>
            </div>
            <div style={{ flex: 1 }}>
                <p><b>${(item.product.price * item.quantity).toFixed(2)}</b></p>
            </div>
        </div>
      ))}
    <h5 className="font-bold mt-1">Items: {cartTotalItems()}</h5>
    <h5 className='font-bold'>Total: ${cartTotalPrice()}</h5>
  </div>
  )
}

export default OrderSummary
