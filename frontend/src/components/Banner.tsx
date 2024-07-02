import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

const Banner = () => {
  return (
    <div className="flex flex-col space-y-2 text-[#333333] md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <img
          src={process.env.PUBLIC_URL + '/images/hero/bg1.jpg'}
          className='w-full h-full object-cover opacity-75'
          alt='poster'
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        Store
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        Clothing Store full of all your desires :)
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-[#F3F3F3]">
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner
