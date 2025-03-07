import React from 'react'
import { API_URL } from '../constants'
import { useStore } from '../contexts/StoreContext'
import { Item } from '../../typings'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';


const CartItem = ({item, removeFromCart}:{item:Item, removeFromCart: (data: Item) => void}) => {
    const {updateCart, state} = useStore()
    const incrementQuantity = () => {
        if (item.quantity<10){
            item.quantity += 1
            update()
        }
    }
    const decrementQuantity = () => {
        if (item.quantity>1){
            item.quantity -= 1
            update()
        }
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center pb-6 mb-6 border-b border-gray-200">
        <div className="flex flex-col items-center mb-4 gap-2">
            <h3 className="font-medium md:hidden">{item.product.name}</h3>
            <div className="w-[120px] mb-2">
                <Link to={`${item.product.get_absolute_url}`}>
                    <div className='flex justify-center'>
                        <img width={120} height={120} src={item.product.imageURL ? API_URL + item.product.imageURL : process.env.PUBLIC_URL + "/images/placeholder.png"} alt={item.product.name} className="object-cover" /> 
                    </div>   
                </Link>
            </div>
            <div className="flex flex-col items-center gap-1 md:hidden">
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm font-medium">Price: ${item.product.price}</p>
            </div>
        </div>
       
        <div className='hidden md:block w-[200px]'>
            <p className="truncate">{item.product.name}</p>
        </div>
        <div className='hidden md:block w-[100px]'>
            <p>{item.size}</p>
        </div>
        <div className='hidden md:block w-[100px]'>
            <p>${item.product.price}</p>
        </div>
        <div className='w-full md:w-[150px] flex justify-center mb-4 md:mb-0'>
            <div className="relative flex items-center w-full max-w-[120px] h-10">
                <button
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 focus:ring-gray-100 focus:ring-2 focus:outline-none h-full"
                onClick={decrementQuantity}>
                <span className="text-lg text-gray-900">−</span>
                </button>
                <input
                type="number"
                className="bg-gray-100 border-x-0 border border-gray-300 h-full text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-none"
                value={item.quantity}
                readOnly
                />
                <button
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3 focus:ring-gray-100 focus:ring-2 focus:outline-none h-full"
                onClick={incrementQuantity}>
                    <span className="text-lg text-gray-900">+</span>
                </button>
            </div>
        </div>
        <div className='w-full md:w-[100px] mb-4 md:mb-0 flex justify-center'>
            <p className="font-medium">${(item.product.current_price * item.quantity).toFixed(2)}</p>
        </div>
        <div className='w-full md:w-[80px] flex justify-center'>
            <button 
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                onClick={remove}
                aria-label="Remove item">
                <FaTrash className='w-5 h-5' />
            </button>
        </div>
    </div>
    )
}

export default CartItem
