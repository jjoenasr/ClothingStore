import React, { useState } from 'react'
import{ ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'

const ModalCart = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div>
        <button className='relative inline-block'>
            <HeartIcon className='h-6 w-6 cursor-pointer' />
            <span className="badge">0</span>
        </button>
        <button className='relative inline-block'>
            <ShoppingCartIcon className='h-6 w-6 cursor-pointer' />
            <span className="badge">0</span>
        </button>
    </div>
  )
}

export default ModalCart
