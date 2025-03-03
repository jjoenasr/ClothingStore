import React from 'react'
import { BiSolidChat } from "react-icons/bi";

const Newsletter = () => {
  const handleClick = () => {
    
  }
  return (
    <div className='bg-black p-8 flex flex-col lg:flex-row items-center gap-3 justify-between max-w-6xl mx-auto'>
        <BiSolidChat className='text-white size-32' />
        <div>
          <h2 className='text-white font-bold leading-none uppercase'>Subscribe to our newsletter</h2>
          <p className='text-gray-300'>
            Get Latest News, Offers and Discounts.
          </p>
        </div>
        <div className='w-full max-w-md p-5 px-8'>
            <input type='email' className='outline-none w-full p-3 rounded-md border border-gray-600 bg-gray-800 text-white' placeholder='guest@example.com' required />
            <button onClick={handleClick} className='btn-success mt-4'>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter
