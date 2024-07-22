import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Hero = () => {
  return (
    <section
    className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
    style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero/new-collection.jpg)`, width:'100vw', height: '32rem', opacity:'0.75'}}
    >

    <div className="container mx-auto">
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide space-y-2  md:space-y-4">
        <h1 className="text-2xl  font-bold md:text-4xl lg:text-7xl">
          Discover Your Style
          </h1>
          <p className="max-w-xs font-semibold text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
          Explore our latest collection for every season
          </p>

          <div className="flex space-x-3">
            <button className="bannerButton bg-[#F3F3F3]">
              Learn More <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
            </button>
          </div>
      </div>
    </div>

    </section>
  )
}

export default Hero
