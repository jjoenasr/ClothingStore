import React from 'react'
import { API_URL } from '../constants'
import { useStore } from '../contexts/StoreContext'
import { Item } from '../../typings'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const CartItem = ({item, removeFromCart}:{item:Item, removeFromCart: (data: Item) => void}) => {
    const {updateCart, state} = useStore()
    const incrementQuantity = () => {
        item.quantity += 1
        update()
    }
    const decrementQuantity = () => {
        item.quantity -= 1
        update()
    }
    const remove = () => {
        removeFromCart(item)
        update()
    }
    const update = () => {
        localStorage.setItem('cart',JSON.stringify(state.cart))
        updateCart()

    }
    return (
        <div className="flex items-stretch pb-10 mb-10 border-b border-gray-200 ">
            <Link to={`${item.product.get_absolute_url}`} style={{ flex: 1 }}>
                {item.product.imageURL ? (
                    <img className="w-24" src={API_URL + item.product.imageURL} alt={item.product.name} />
                ) : (
                    <img className="w-24" src="/images/placeholder.png" alt={item.product.name} />
                )}
            </Link>
            <div style={{ flex: 2 }}>
                <p>{item.product.name}</p>
            </div>
            <div style={{ flex: 1 }}>
                <p>{item.size}</p>
            </div>
            <div  style={{ flex: 1 }}>
                <p>${item.product.price}</p>
            </div>
            <div  style={{ flex: 2 }}>
                <div className="relative flex items-center max-w-[8rem] h-10 mt-2">
                    <button
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 focus:ring-gray-100 focus:ring-2 focus:outline-none h-full"
                    onClick={decrementQuantity}>
                    <span className="text-xl  text-gray-900 ">−</span>
                    </button>
                    <input
                    type="number"
                    className="bg-gray-100 border-x-0 border border-gray-300 h-full text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-none "
                    value={item.quantity}
                    readOnly
                    />
                    <button
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3  focus:ring-gray-100  focus:ring-2 focus:outline-none h-full"
                    onClick={incrementQuantity}>
                        <span className="text-xl text-gray-900">+</span>
                    </button>
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <p>${(item.product.current_price * item.quantity).toFixed(2)}</p>
            </div>
            <div style={{ flex: 1 }}>
                <FaTrash className='text-red-500 chg-quantity cursor-pointer' onClick={remove} />
            </div>
            
    </div>
    )
}

export default CartItem
