import React from 'react'
import { useState } from 'react'
import cat1 from '../assets/images/category-1.jpg'
import cat2 from '../assets/images/category-2.jpg'
import cat3 from '../assets/images/category-3.jpg'
import cat4 from '../assets/images/category-4.jpg'
import cat5 from '../assets/images/category-5.jpg'


const Carousel = () => {
  return (
   <div className='h-[500px] md:h-auto p-5 pb-4'>
    <h1 className='py-14 text-center lg:text-6xl text-3xl font-bold flex flex-row gap-2 justify-center'><span className='text-[--portland-orange]'>Top</span> categories</h1>
        
        <ul className='flex flex-row gap-8 md:justify-center overflow-x-auto snap-x pb-5'>

            <li className='flex flex-col snap-start gap-4 md:min-w-[cal(33.33% - 20px)] lg:min-w-[calc(20% - 24px)] sm:min-w-[cal(50% - 15px)]'>
                <img className='max-w-sm object-cover' src={ cat1 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Cat Food</h1>
            </li>

            <li className='flex flex-col gap-4 md:min-w-[cal(33.33% - 20px)] lg:min-w-[calc(20% - 24px)] sm:min-w-[cal(50% - 15px)]'>
                <img className=' max-w-sm object-cover' src={ cat2 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Cat Toys</h1>
            </li>

            <li className='flex flex-col gap-4 md:min-w-[cal(33.33% - 20px)] lg:min-w-[calc(20% - 24px)] sm:min-w-[cal(50% - 15px)]'>
                <img className=' max-w-md object-cover' src={ cat3 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Dog Food</h1>
            </li>

            <li className='flex flex-col gap-4 md:min-w-[cal(33.33% - 20px)] lg:min-w-[calc(20% - 24px)] sm:min-w-[cal(50% - 15px)]'>
                <img className=' max-w-md object-cover' src={ cat4 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Dog Toy's</h1>
            </li>

            <li className='flex flex-col gap-4 md:min-w-[cal(33.33% - 20px)] lg:min-w-[calc(20% - 24px)] sm:min-w-[cal(50% - 15px)]'>
                <img className=' max-w-md object-cover' src={ cat5 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Dog Toy's</h1>
            </li>
            
        </ul>
   </div> 
  )
}

export default Carousel