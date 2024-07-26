import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Hero = () => {
  return (
    <section className="w-full mx-auto flex items-center bg-cover  bg-center relative w-100 h-[32rem]">
    <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero/new-collection.jpg)` }}>
    </div>

    <div className="container mx-auto relative z-20">
      <div className="flex flex-col w-full max-w-3xl justify-center items-start  pl-6 tracking-wide space-y-3  md:space-y-4">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-7xl">
          Discover Your Style
        </h1>
        <p className=" font-semibold  text-xs text-shadow-md md:text-lg  lg:text-2xl">
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
