import React from 'react'
import { API_URL } from '../constants'
import { useStore } from '../contexts/StoreContext'
import { Item } from '../../typings'
import { FaCaretDown, FaCaretUp, FaTrash } from "react-icons/fa";
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
            <Link to={`${item.product.get_absolute_url}`} style={{ flex: 2 }}>
                {item.product.imageURL ? (
                    <img className="w-24" src={API_URL + item.product.imageURL} alt={item.product.name} />
                ) : (
                    <img className="w-24" src="/images/placeholder.png" alt={item.product.name} />
                )}
            </Link>
            <div style={{ flex: 2 }}>
                <p>{item.product.name}</p>
            </div>
            <div style={{ flex: 2 }}>
                <p>{item.size}</p>
            </div>
            <div  style={{ flex: 2 }}>
                <p>${item.product.price}</p>
            </div>
            <div  style={{ flex: 1 }}>
                <p className="inline-block font-semibold mr-2">{item.quantity}</p>
                <div className="inline-block font-semibold pr-2">
                    <FaCaretUp className='chg-quantity cursor-pointer' onClick={incrementQuantity} />
                    <FaCaretDown className='chg-quantity cursor-pointer' onClick={decrementQuantity} />
                    <FaTrash className='text-red-500 chg-quantity cursor-pointer' onClick={remove} />
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
    </div>
    )
}

export default CartItem
