import React from 'react'
import Heroimg from '../assets/images/hero-banner.jpg'

const Hero = () => {
  return (
    <div className='h-1/2 md:h-screen'>
            <img className='md:w-full h-[50%] md:mt-15 md:h-auto object-cover object-left absolute' src={Heroimg} alt="" />
            <div className='flex flex-col lg:max-w-4xl lg:top-40 gap-2 items-center justify-center py-20 text-center relative'>
                <h1 className='font-[bangers] text-white text-6xl md:text-9xl'>High Quality<br></br>Pet Food</h1>
                <p className='text-white'>Sale up to 40% off today</p>
                <button>Shop Now</button>
        </div>
    </div>
  )
}

export default Hero