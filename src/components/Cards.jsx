import React from 'react'
import offerbanner1 from '../assets/images/offer-banner-1.jpg'
import offerbanner2 from '../assets/images/offer-banner-2.jpg'
import offerbanner3 from '../assets/images/offer-banner-3.jpg'

const Cards = () => {
  return (
    <div className='flex flex-col items-center gap-12 md:flex-col xl:flex-row xl:flex-row md:justify-stretch py-28'>
        <div className='max-w-xs h-[210px] md:max-w-lg md:h-[300px] overflow-hidden rounded-2xl'>
        <div className='absolute z-30 py-6 px-4 text-left h-[219px]'>
                <p className='text-sm uppercase font-bold'>Selected items. Online Only</p>
                <h1 className='text-3xl font-bold pb-3'>Hot Summer<br></br>Deals</h1>
                <button className='bg-orange-500 hover:bg-black'> Read More </button>
            </div>
            <img className='transition duration-300 ease-in-out hover:scale-125' src={offerbanner1} alt="" />
        </div>

        <div className='max-w-xs h-[210px] md:max-w-lg md:h-[300px] overflow-hidden rounded-2xl'>
        <div className='absolute z-30 py-6 px-4 items-center text-left h-[219px]'>
                <p className='text-sm uppercase font-bold'>Treats & Grooming</p>
                <h1 className='text-3xl font-bold pb-3'>Spoil your true<br></br>love</h1>
                <button className='bg-orange-500 hover:bg-black'> Read More </button>
            </div>
            <img className='transition duration-300 ease-in-out hover:scale-125' src={offerbanner2}  alt="" />
        </div>

        <div className='max-w-xs h-[210px] md:max-w-lg md:h-[300px] overflow-hidden rounded-2xl'>
          <div className='absolute z-30 py-6 px-4 items-center text-left h-[219px]'>
                <p className='text-sm uppercase font-bold'>Our Brand You Will Love</p>
                <h1 className='text-3xl font-bold pb-3'>New in this<br></br>year</h1>
                <button className='bg-orange-500 hover:bg-black'> Read More </button>
          </div>
            <img className='transition duration-300 ease-in-out hover:scale-125' src={offerbanner3}  alt="" />
        </div>

    </div>
  )
}

export default Cards