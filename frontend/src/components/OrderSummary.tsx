import React from 'react'
import { Item } from '../../typings'
import { API_URL } from '../constants'

const OrderSummary = ({items, totalItems, totalPrice}:{ items: Item[], totalItems: number, totalPrice:number }) => {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div className="flex items-stretch space-x-1 py-5 border-b border-gray-200" key={index}>
            <div style={{ flex: 1 }}>
              <img width={100} height={100} src={item.product.imageURL ? API_URL + item.product.imageURL : process.env.PUBLIC_URL + "/images/placeholder.png"} alt={item.product.name} />
            </div>
            <div style={{ flex: 2 }}>
                <p className="font-semibold">{item.product.name} x {item.quantity}</p>
				        <p className="font-light">{item.size}</p>
            </div>
            <div style={{ flex: 1 }}>
                <p><b>${(item.product.current_price * item.quantity).toFixed(2)}</b></p>
            </div>
        </div>
      ))}
    <h5 className="font-bold mt-1">Items: {totalItems}</h5>
    <h5 className='font-bold'>Total: ${totalPrice.toFixed(2)}</h5>
  </div>
  )
}

export default OrderSummary
