import React from 'react'
import Heroimg from '../assets/images/hero-banner.jpg'

const Hero = () => {
  return (
    <div className='h-1/2 py-14 md:h-full md:w-screen'>
        <div className=''>
            <img className='h-[50%] md:w-screen md:mt-15 md:h-auto object-cover object-left absolute' src={Heroimg} alt="" />
            <div className='flex flex-col gap-2 items-center justify-center py-20 text-center relative'>
                <h1 className='font-[bangers] text-white text-7xl'><span className='font-[bangers] text-4xl'>High Quality</span> Pet Food</h1>
                <p className='text-white'>Sale up to 40% off today</p>
                <button>Shop Now</button>
            </div>
        </div>
    </div>
  )
}

export default Hero