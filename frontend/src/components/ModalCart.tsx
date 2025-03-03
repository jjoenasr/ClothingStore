import React, { useState } from 'react'
import{ ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext'
import OrderSummary from './OrderSummary'
import ProductCard from './ProductCard'


const ModalCart = () => {
  const {cartTotalItems, cartTotalPrice, favoritesTotal, state} = useStore()
  const items = state.cart
  const favorites = state.favorites
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('cart')
  const navigate = useNavigate()

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflow = 'auto'
    setTimeout(()=>{
      setIsOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const handleTabChange = (tab:string) => {
    setActiveTab(tab)
  }


  return (
    <>
      <div className='relative inline-block' onClick={openModal}>
        <HeartIcon className='h-6 w-6 cursor-pointer' />
        <span className="badge">{favoritesTotal()}</span>
      </div>
      <div className='relative inline-block' onClick={openModal}>
          <ShoppingCartIcon className='h-6 w-6 cursor-pointer' />
          <span className="badge">{cartTotalItems()}</span>
      </div>

      { isOpen && (
        <>
        <div className='cartoverlay' onClick={closeModal}></div>
        <div className={`cartmodal p-8 md:p-16 ${isClosing ? 'closing' : ''}`}>
          <div className='flex justify-between gap-4'>
            <button className={`flex items-center gap-2 font-medium ${activeTab==='cart' ? 'text-black' : ''}`}
            onClick={() => handleTabChange('cart')}>
              Shopping Cart
              <span className='w-7 h-7 text-[11px] font-normal rounded-full text-white grid place-content-center bg-black'>
                {cartTotalItems()}
              </span>
            </button>
            <button className={`flex items-center gap-2 font-medium ${activeTab==='wishlist' ? 'text-black' : ''}`}
            onClick={() => handleTabChange('wishlist')}>
              Wishlist
              <span className='w-7 h-7 text-[11px] font-normal rounded-full text-white grid place-content-center bg-black'>
                {favoritesTotal()}
              </span>
            </button>
          </div>
          <div className='flex'>
            <div className={`line ${activeTab ==='cart' ? 'active' : ''}`}>
            </div>
            <div className={`line ${activeTab ==='wishlist' ? 'active' : ''}`}>
            </div>
          </div>
          { activeTab==='cart' ? (
            <div className='flex flex-col space-y-2' >
            <OrderSummary items={items} totalItems={cartTotalItems()} totalPrice={cartTotalPrice()} />
            <button className="flex-1 btn-dark mt-3" onClick={()=> {closeModal(); navigate('/cart'); }}> View Cart</button>
            </div>
          ) : (
            <div className='flex flex-col space-y-2 mt-3'>
            { favorites?.map((product )=> (
              <div className='w-full p-2' key={product.id}>
                <ProductCard product={product} />
              </div>
              ) )}
            </div>
          )}
            </div>
        </>
      )}

    </>
  )
}

export default ModalCart
