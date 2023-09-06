import React from 'react'
import Heroimg from '../assets/images/hero-banner.jpg'

const Hero = () => {
  return (
    <div className='w-screen pt-16 h-[400px] sm:h-auto lg:pt-0 md:justify-start flex items-center justify-center text-center relative overflow-hidden'>
      <div className='absolute flex flex-col xl:pr-20 items-center gap-2 md:pl-20'>
                <h1 className='font-[bangers] text-white text-6xl md:text-9xl xl:text-[10rem]'><span className='text-6xl xl:text-[5rem]'>High Quality</span><br></br>Pet Food</h1>
                <p className='text-white lg:text-2xl'>Sale up to 40% off today</p>
                <button className='lg:text-2xl'>Shop Now</button>
        </div>
            <img className='h-full object-left object-cover xl:w-full' src={Heroimg} alt="" />
        
    </div>
  )
}

export default Hero