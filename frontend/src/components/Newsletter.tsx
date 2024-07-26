import React from 'react'
import { BiSolidChat } from "react-icons/bi";

const Newsletter = () => {
  const handleClick = () => {
    
  }
  return (
    <div className='box bg-black p-8 flex flex-col lg:flew-row items-center justify-between max-w-6xl mx-auto'>
      <div className='flex items-center gap-3'>
        <BiSolidChat className='text-white size-32' />
        <div>
          <h2 className='text-white font-bold leading-none uppercase'>Subscribe to our newsletter</h2>
          <p className='text-gray-300'>
            Get Latest News, Offers and Discounts.
          </p>
        </div>
        <div className='left w-full p-5 px-8 lg:w-1/2'>
            <input type='email' className='outline-none w-full p-3' placeholder='guest@example.com' autoFocus required />
            <button onClick={handleClick} className='btn-success mt-4'>Subscribe</button>
        </div>
    </div>
    </div>
  )
}

export default Newsletter
