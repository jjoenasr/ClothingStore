import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'


const Banner = () => {
  return (
    <div className='relative h-[40vh] lg:h-[80vh]'>
      <div className="flex flex-col space-y-2 px-2 py-2 text-white md:space-y-4 lg:pb-12 justify-center items-center h-full">
        <div className="absolute top-0 left-0 -z-5 h-full w-screen opacity-75">
          <img
            src="/images/hero/new-collection.jpg"
            className='object-cover w-full h-full'
            alt='poster'
          />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-2xl font-extrabold md:text-4xl lg:text-7xl">
            Discover your style
          </h1>
          <p className="max-w-xs text-xs font-bold text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            Explore our latest collection for every season
          </p>

          <div className="flex space-x-3">
            <button className="bannerButton bg-[gray]/70">
              More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
            </button>
          </div>
        </div>

        
      </div>
    </div>

  )
}

export default Banner
